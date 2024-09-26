import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { summaryDonations } from './helpers';
import numeral from 'numeral';
import { Container } from './components/Container';
import { Card, CardDetail, HoverCard } from './components/Card';
import { Wrapper } from './components/Wrapper';
import { ImageContainer, Image } from './components/ImageContainer';
import { ContainButton, OutlinedButton } from './components/Button';
import { BackdropOverlay, AlertDialog } from './components/AleartDialog';

export default connect((state) => state)(
  class App extends Component {
    state = {
      currentTotal: 0,
      charities: [],
      selectedAmount: 10,
      message: '', // ADD: message to display on dialog
      selectedCharityId: null, // ADD: current selecting charity user clicks Donate button
      dialogOpen: false, // ADD: a flag to check if global dialog is set to open
      success: false, // ADD: a flag to determine if the update donation is success
    };

    // ADD: optionOptionsRef is set to be a reference for the selecting charity Card to place an overlay donate options
    optionOptionsRef = React.createRef();

    // ADD: to handle to remove event when component is unmounted
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickAwayListener);
    }

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.setState({ charities: data });
        });

      fetch('http://localhost:3001/payments')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => item.amount)),
          });
          // ADD: to collect current total amount in state
          self.setState((prev) => ({
            ...prev,
            currentTotal: summaryDonations(data.map((item) => item.amount)),
          }));
        });

      // ADD: to add an event listener to handle when user click away the selecting card
      document.addEventListener('mousedown', this.handleClickAwayListener);
    }

    // ADD: handlePay function to perform posting to update new value via API server
    handlePay = (id, amount, currency) => {
      fetch('http://localhost:3001/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          charitiesId: id,
          amount: amount,
          currency: currency,
        }),
      })
        .then((res) => {
          // ADD: to update state the added amount and  message
          const charity = this.state.charities.find((c) => c.id == id);
          this.toggleOpenDonateOptions(null);
          const message = `Thank you for donating ${amount} ${currency} to ${charity.name}`;
          this.props.dispatch({
            type: 'ADD_DONATION',
            amount,
          });

          this.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message,
          });
          this.setState((prev) => ({
            ...prev,
            dialogOpen: true,
            success: true,
            message,
            currentTotal: amount + this.state.currentTotal,
          }));
        })
        .catch((error) => {
          // ADD: to handle when updated data is invalid then get message to user
          const message = `An error occorred while donating!. Please try again.`;
          this.props.dispatch({
            type: 'UPDATE_MESSAGE',
            message,
          });
          this.setState((prev) => ({
            ...prev,
            dialogOpen: true,
            success: false,
            message,
          }));
        });
    };

    // ADD: to handle toggle selecting charity card
    toggleOpenDonateOptions = (charityId) => {
      this.setState((prevState) => ({
        ...prevState,
        selectedCharityId:
          prevState.selectedCharityId === charityId ? null : charityId,
      }));
    };

    // ADD: to handle reference when user click outside the card
    handleClickAwayListener = (event) => {
      if (
        this.optionOptionsRef.current &&
        !this.optionOptionsRef.current.contains(event.target)
      ) {
        this.setState((prevState) => ({
          ...prevState,
          selectedCharityId: null,
        }));
      }
    };

    render() {
      const self = this;
      const { selectedCharityId } = self.state;
      const cards = this.state.charities.map(function (item, i) {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <label key={j}>
            <input
              defaultChecked={self.state.selectedAmount === amount}
              type="radio"
              name="payment"
              onClick={function () {
                self.setState({ selectedAmount: amount });
              }}
              style={{ cursor: 'pointer' }}
            />
            {numeral(amount).format('0,0.[00]')}
          </label>
        ));

        const closeButtonStyle = {
          position: 'absolute',
          top: 8,
          right: 16,
          cursor: 'pointer',
        };

        const paymentButtonStyle = { display: 'flex', gap: 8, marginBottom: 8 };

        return (
          <Card key={i}>
            <ImageContainer>
              <Image
                src={`/images/${item.image}`}
                alt={`charity-image-${item.name}`}
              />
            </ImageContainer>
            <CardDetail>
              <div>
                <b style={{ fontSize: 16 }}>{item.name}</b>
                <p style={{ fontSize: 14, color: '#5c6785AA' }}>
                  available currency ({item.currency})
                </p>
              </div>
              <OutlinedButton
                onClick={() => self.toggleOpenDonateOptions(item.id)}
              >
                Donate
              </OutlinedButton>
            </CardDetail>
            {selectedCharityId === item.id && (
              <HoverCard ref={self.optionOptionsRef}>
                <p style={{ color: 'grey' }}>
                  Select the amount to donate (THB)
                </p>
                <div style={paymentButtonStyle}>{payments}</div>
                <ContainButton
                  onClick={() =>
                    self.handlePay(
                      item.id,
                      self.state.selectedAmount,
                      item.currency
                    )
                  }
                >
                  Pay Now
                </ContainButton>
                <div
                  style={closeButtonStyle}
                  onClick={() => self.toggleOpenDonateOptions(null)}
                >
                  <p style={{ fontWeight: 700, color: 'grey' }}>x</p>
                </div>
              </HoverCard>
            )}
          </Card>
        );
      });

      const style = {
        color: this.state.success ? '#0ca98b' : '#ff614e',
        margin: '1em 0',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
      };

      const dialogCloseStyle = {
        marginTop: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      };

      const horizonHeaderLineStyle = {
        width: 240,
        height: 2,
        background: '#5c6785',
      };

      const donate = this.state.currentTotal;
      const message = this.props.message;

      return (
        <Container>
          <h1>Omise Tamboon ReactJS</h1>
          <hr style={horizonHeaderLineStyle} />
          <p>Total donations: {numeral(donate).format('0,0.[00]')} THB</p>
          <p style={style}>{message}</p>
          <Wrapper>{cards}</Wrapper>

          {this.state.dialogOpen && (
            <>
              <AlertDialog>
                <b style={{ fontSize: 18 }}>
                  {this.state.success
                    ? 'Donate successfully!'
                    : 'Oops! Something wrong'}
                </b>
                <p>{this.state.message}</p>
                <div style={dialogCloseStyle}>
                  <ContainButton
                    onClick={() => this.setState({ dialogOpen: false })}
                  >
                    Okay
                  </ContainButton>
                </div>
              </AlertDialog>
              <BackdropOverlay />
            </>
          )}
        </Container>
      );
    }
  }
);

/**
 * Handle pay button
 * 
 * @param {*} The charities Id
 * @param {*} amount The amount was selected
 * @param {*} currency The currency
 * 
 * @example
 * fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: `{ "charitiesId": ${id}, "amount": ${amount}, "currency": "${currency}" }`,
    })
 */

// function handlePay(id, amount, currency) {}
