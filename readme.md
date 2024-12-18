# **Sleepy-Me Tracker**

## Overview
**Sleepy-Me Tracker** is a mobile sleep tracker app designed to help users log and track their sleep and sleepiness patterns. The app allows users to log their overnight sleep, record their sleepiness levels throughout the day using the Stanford Sleepiness Scale, and view the data over time.

The data is backed up in the app using the sleep.service.ts file, where the logged data is stored and retrieved using JSON.parse for data persistence. This project was developed as part of a project for User-Interface Software (INF 134) course at UCI.

## Features
  * **Log Overnight Sleep**: Users can log their sleep data, including bedtimes and wake-up times in the 'Overnight' tab, located in the center of the footer.
  * **Log Sleepiness During the Day**: Users can log their sleepiness levels on a 1-7 scale as defined by the Stanford Sleepiness Scale in the 'Sleepiness' tab, located on the right of the footer.
  * **View Logged Data**: Both sleep and sleepiness data can be viewed together in the 'Dashboard' tab, located on the left of the footer.
  * **Data Backup**: Logs are stored in the sleep.service.ts file and persist through app restarts by storing them in localStorage and parsing the data with JSON.parse.

## Getting Started
### Installation
  * Node.js: Ensure you have the latest LTS version of Node.js installed.
  * Dependencies:

    `npm install`
  * Ionic CLI:

    `npm install -g @ionic/cli`
### Run the app
Run `ionic serve`

This will start the app at [localhost:8100](http://localhost:8100)

## Resources
  [Ionic Documentation](https://ionicframework.com/docs)
  
  [Stanford Sleepiness Scale](https://en.wikipedia.org/wiki/Stanford_Sleepiness_Scale)
