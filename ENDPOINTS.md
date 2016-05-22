# API Endpoints

## GET /lines

Retrieve lines for input transport agency.

### Parameters
agency: Transport agency name

### Example Request

curl localhost:3000/lines?agency=SF-MUNI

```javascript
  {
    "Name": "1-California",
    "Code": "1"
  },
  {
    "Name": "10-Townsend",
    "Code": "10"
  },
  {
    "Name": "12-Folsom Pacific",
    "Code": "12"
  },
  {
    "Name": "14-Mission",
    "Code": "14"
  },
  {
    "Name": "14X-Mission Express",
    "Code": "14X"
  },
  {
    "Name": "18-46th Avenue",
    "Code": "18"
  },
  {
    "Name": "19-Polk",
    "Code": "19"
  },
  {
    "Name": "19th Avenue Rapid",
    "Code": "28R"
  },
  {
    "Name": "1AX-California A Express",
    "Code": "1AX"
  },
  {
    "Name": "1BX-California B Express",
    "Code": "1BX"
  },
  {
    "Name": "2-Clement",
    "Code": "2"
  },
  {
    "Name": "21-Hayes",
    "Code": "21"
  },
  {
    "Name": "22-Fillmore",
    "Code": "22"
  },
  {
    "Name": "23-Monterey",
    "Code": "23"
  },
  {
    "Name": "24-Divisadero",
    "Code": "24"
  },
  {
    "Name": "27-Bryant",
    "Code": "27"
  },
  {
    "Name": "28-19th Avenue",
    "Code": "28"
  },
  {
    "Name": "29-Sunset",
    "Code": "29"
  },
  {
    "Name": "3-Jackson",
    "Code": "3"
  },
  {
    "Name": "30-Stockton",
    "Code": "30"
  },
  {
    "Name": "30X-Marina Express",
    "Code": "30X"
  },
  {
    "Name": "31-Balboa",
    "Code": "31"
  },
  {
    "Name": "31AX-Balboa A Express",
    "Code": "31AX"
  },
  {
    "Name": "31BX-Balboa B Express",
    "Code": "31BX"
  },
  {
    "Name": "33-Ashbury-18th",
    "Code": "33"
  },
  {
    "Name": "35-Eureka",
    "Code": "35"
  },
  {
    "Name": "36-Teresita",
    "Code": "36"
  },
  {
    "Name": "37-Corbett",
    "Code": "37"
  },
  {
    "Name": "38-Geary",
    "Code": "38"
  },
  {
    "Name": "38AX-Geary A Express",
    "Code": "38AX"
  },
  {
    "Name": "38BX-Geary B Express",
    "Code": "38BX"
  },
  {
    "Name": "39-Coit",
    "Code": "39"
  },
  {
    "Name": "41-Union",
    "Code": "41"
  },
  {
    "Name": "43-Masonic",
    "Code": "43"
  },
  {
    "Name": "44-OShaughnessy",
    "Code": "44"
  },
  {
    "Name": "45-Union Stockton",
    "Code": "45"
  },
  {
    "Name": "47-Van Ness",
    "Code": "47"
  },
  {
    "Name": "48-Quintara 24th Street",
    "Code": "48"
  },
  {
    "Name": "49-Van Ness Mission",
    "Code": "49"
  },
  {
    "Name": "5-Fulton",
    "Code": "5"
  },
  {
    "Name": "52-Excelsior",
    "Code": "52"
  },
  {
    "Name": "54-Felton",
    "Code": "54"
  },
  {
    "Name": "55-16th Street",
    "Code": "55"
  },
  {
    "Name": "56-Rutland",
    "Code": "56"
  },
  {
    "Name": "6-Haight-Parnassus",
    "Code": "6"
  },
  {
    "Name": "66-Quintara",
    "Code": "66"
  },
  {
    "Name": "67-Bernal Heights",
    "Code": "67"
  },
  {
    "Name": "76X-Marin Headlands Express",
    "Code": "76X"
  },
  {
    "Name": "8-Bayshore",
    "Code": "8"
  },
  {
    "Name": "81X-Caltrain Express",
    "Code": "81X"
  },
  {
    "Name": "82X-Levi Plaza Express",
    "Code": "82X"
  },
  {
    "Name": "83X-Caltrain",
    "Code": "83X"
  },
  {
    "Name": "88-Bart Shuttle",
    "Code": "88"
  },
  {
    "Name": "8AX-Bayshore A Express",
    "Code": "8AX"
  },
  {
    "Name": "8BX-Bayshore B Express",
    "Code": "8BX"
  },
  {
    "Name": "9-San Bruno",
    "Code": "9"
  },
  {
    "Name": "90-San Bruno Owl",
    "Code": "90"
  },
  {
    "Name": "91-Owl",
    "Code": "91"
  },
  {
    "Name": "California Cable Car",
    "Code": "61"
  },
  {
    "Name": "F-Market And Wharves",
    "Code": "F"
  },
  {
    "Name": "Fulton Rapid",
    "Code": "5R"
  },
  {
    "Name": "Geary Rapid",
    "Code": "38R"
  },
  {
    "Name": "HaightNoriega",
    "Code": "7"
  },
  {
    "Name": "HaightNoriega Rapid",
    "Code": "7R"
  },
  {
    "Name": "J-Church",
    "Code": "J"
  },
  {
    "Name": "K-Owl",
    "Code": "K_OWL"
  },
  {
    "Name": "KT-Ingleside Third Street",
    "Code": "KT"
  },
  {
    "Name": "L-Owl",
    "Code": "L_OWL"
  },
  {
    "Name": "L-Taraval",
    "Code": "L"
  },
  {
    "Name": "M-Ocean View",
    "Code": "M"
  },
  {
    "Name": "M-Owl",
    "Code": "M_OWL"
  },
  {
    "Name": "Mission Rapid",
    "Code": "14R"
  },
  {
    "Name": "N-Judah",
    "Code": "N"
  },
  {
    "Name": "N-Owl",
    "Code": "N_OWL"
  },
  {
    "Name": "Noriega Express",
    "Code": "7X"
  },
  {
    "Name": "NX-N Express",
    "Code": "NX"
  },
  {
    "Name": "Parkmerced",
    "Code": "57"
  },
  {
    "Name": "Powell Hyde Cable Car",
    "Code": "60"
  },
  {
    "Name": "Powell Mason Cable Car",
    "Code": "59"
  },
  {
    "Name": "San Bruno Rapid",
    "Code": "9R"
  },
  {
    "Name": "T-Owl",
    "Code": "T_OWL"
  },
  {
    "Name": "Treasure Island",
    "Code": "25"
  }
]
```

## GET /times

Find upcoming train times for first stop on a given line.

### Parameters

* agency: Transport agency name
* route: Route code from /lines call
* direction: [Inbound/Outbound]

### Example Request

curl http://localhost:3000/times?agency=SF-MUNI&route=N&direction=Inbound

```javascript
[
  "3",
  "5",
  "16"
]
```

