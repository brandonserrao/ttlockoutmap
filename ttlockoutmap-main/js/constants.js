// paste in your published Google Sheets URL from the browser address bar
const googleDocURL = 'https://docs.google.com/spreadsheets/d/1ynT90bScxc8q9NJX3Erk4PGp0Y6-lCq9eqrJRnie1w0/edit#gid=0'

//Google Sheets API key from https://console.developers.google.com
const googleApiKey = 'AIzaSyDH7_RHe79ajPYJH5hgg-9i97ER-NrpNks';

//link to google forms and entry codes for pre-filling; add '&entry.CODESTRING=DESIREDVALUE' at end of BaseURL to prefill desired entries
const googleFormBaseURL = 'https://docs.google.com/forms/d/e/1FAIpQLSeIZzZ4m6gZqgVPszbrReHtE6g4n0k7gnTGQxKjmx198m0GAA/viewform?usp=pp_url';
const formEntryCodes = { //to be used for 
    city : '951397439',
    coords : '1691643040',
    name: '1075366382',
    currentCountry : '2031572860',
    housing : '2043861216',
}

//control of snippet length
const snippetLength = 180 ;//based on twitter old length
const snippetTotal = 50; //number of snippets to load
const scrollTimeIncr = 5000 //time before scrolling to next snippet; not used, change manually in (my_)ticker.js .tick

const tickerContainerId = 'ticker-wrapper-inner'

const selectorOn = false; //testing draggable location selector



const storyPlaceholder = 'No Story Submitted';
