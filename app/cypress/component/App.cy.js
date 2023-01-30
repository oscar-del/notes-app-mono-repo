import React from 'react'
import App from '../../src/App'

describe('App.cy.js', () => {
  beforeEach(() => {
    cy.mount(<App />)

    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Eduardo',
      username: 'eduardo',
      password: '123'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login from can be opened', () => {
    cy.contains('Show Login').click()
  })

  it('login from', () => {
    cy.contains('Show Login').click()
    cy.get('input').first().type('eduardo')
    cy.get('input').last().type('123')
    cy.get('#form-login-button').click()
    cy.contains('New Note')
  })

  /* it('login fails with wrogn password', () => {
    cy.contains('Show Login').click()
      cy.get('input').first().type('eduardo')
      cy.get('input').last().type('password-incorrecto')
      cy.get('#form-login-button').click()
      
      //cy.get('.error').conatiner('Wrong credential')
      cy.get('.error')
        .should('contain', 'Wrong credential')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
  }) */

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'eduardo', password: '123' })
    })

    it('a new note can be create', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('New Note').click()
      cy.get('input').type(noteContent)
      cy.contains('save').click()
      cy.contains(noteContent)
    })
    
    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'This is the first note',
          important: false
        })

        cy.createNote({
          content: 'This is the second note',
          important: false
        })

        cy.createNote({
          content: 'This is the third note',
          important: false
        })
      })

      it.only('it can be made important', () => {
        cy.contains('This is the second note').as('theNote')

        cy.get('@theNote')
          .contains('make important')
          .click()

        cy.debug()

        cy.get('@theNote')
          .contains('make not important')
      })
    })
  })
})