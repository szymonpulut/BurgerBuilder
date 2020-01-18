# Burger Builder

## Description

A burger builder app i made during a course [React - The Complete Guide](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) (Maximillian Schwarzmuller, udemy.com). Started with a simple app, over time built into an advanced webapp. Features authentication, Redux for global state keeping, axios for storing data in database. After "finishing" I added my own modifications - introduced PropTypes, changed the style of code (hooks usage, more consistent naming, performance changes, absolute imports), enforced airbnb style guide and developed a couple of new features. Deployed on Firebase.

## Quick overview

Demo: [https://burgerbuilder.szymonpulut.com/](https://burgerbuilder.szymonpulut.com/)

User can quickly build a burger, then order it (dispatch order to database), but a sign up (regex email address verification) and log in are required. After ordering, user can review their orders on "Orders" page.

## Technologies used & features

React, SASS modules, Router, Redux (thunk & saga), hooks (1 custom hook), lazy loading, authentication on remote server, contact with remote database, local storage data persistence, and many more. This project was meant for learning React ecosystem, so some of the solutions used are not necessary on this scale.

## Running

```
npm install
```

`npm run start` starts development server

`npm run build` creates production ready package
