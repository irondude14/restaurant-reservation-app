# Restaurant Reservation App

## Description

This is a web application for making restaurant reservations. Customers can browse available restaurants, select a date and time, and reserve a table at the restaurant of their choice. Restaurant owners can manage their reservations and change information about their properties.

## Requirements

To install and run the app, you need to have Ruby, Ruby on Rails, and Node.js installed on your machine.

- Ruby 2.7.4
- NodeJS (v16)

See Environment Setup below for instructions on installing these tools if you
don't already have them.

## Setup

Once you have Ruby, Rails, and Node.js installed, you can clone the repository and run the following commands in the terminal:

```console
cd restaurant_reservation_app
bundle install
rails db:migrate
rails db:seed
cd client
npm install
npm start
```

This will install the necessary dependencies, create the database schema and seed data, and start the Rails server and the React frontend. You can then access the app at http://localhost:3000.

## Environment Setup

### Install the Latest Ruby Version

Verify which version of Ruby you're running by entering this in the terminal:

```console
$ ruby -v
```

We recommend version 2.7.4. If you need to upgrade you can install it using rvm:

```console
$ rvm install 2.7.4 --default
```

You should also install the latest versions of `bundler` and `rails`:

```console
$ gem install bundler
$ gem install rails
```

### Install NodeJS

Verify you are running a recent version of Node with:

```sh
node -v
```

If your Node version is not 16.x.x, install it and set it as the current and
default version with:

```sh
nvm install 16
nvm use 16
nvm alias default 16
```

You can also update your npm version with:

```sh
npm i -g npm
```

## Usage

To use the app, customers can browse available restaurants, view their menus, and select a date and time for their reservation. Restaurant owners can log in to their account and manage their reservations, and update their restaurant's information.
