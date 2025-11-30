 ┌─────────────────────────┐
 │        Wix Studio       │
 │  (UI + iFrame Loader)   │
 │                         │
 │  - Login Page           │
 │  - Dashboard            │
 │  - ShuttleSync Modules  │
 └─────────────┬──────────┘
               │ loads HTML/JS via iframe
               ▼
 ┌─────────────────────────┐
 │        GitHub           │
 │  Static Files Only      │
 │  - HTML                 │
 │  - CSS                  │
 │  - JS                   │
 └─────────────┬──────────┘
               │ fetch(), POST to
               ▼
 ┌─────────────────────────┐
 │       Make.com          │
 │  All backend logic      │
 │  - Auth validation      │
 │  - Connect Magic        │
 │  - Connect Airtable     │
 │  - Connect Amadeus      │
 │  - Return data to Wix   │
 └─────────────┬──────────┘
               │
               ▼
 ┌─────────────────────────┐
 │        Airtable         │
 │   Employee, Booking DB  │
 └─────────────────────────┘

 ┌─────────────────────────┐
 │      Magic Auth         │
 │Passwordless Authentication
 └─────────────────────────┘

 ┌─────────────────────────┐
 │       Amadeus API       │
 │  Flights + Hotels       │
 └─────────────────────────┘


Usage inside ANY ShuttleSync HTML page, At the top of your HTML (just inside <body>):
<div id="ss-header"></div>
<div style="height:64px"></div> <!-- pushes content below header -->

Load CSS + JS:
<link rel="stylesheet" href="../auth/header.css" />
<script src="../auth/header.js"></script>

Required session schema in localStorage, every login scenario must send back:
{
  "sessionToken": "abc123...",
  "skid": "AB1234",
  "fullName": "John Doe",
  "role": "Destination"
}
-----------------------------------------------------------------------------------------


Everything else below stays exactly as-is.
------------------------------------------------------------

✔ /destination/home/				
		empCheckInOut.html						
		internalMail.html						
		groupTalk.html							
		reporting.html							
		settings.html [(Airport Incident Management)]							
		logout.html	
		weather.html (todays forcast)

✔ /destination/paxCI/				
		welcomeMeetings.html [(Ground Operations -> Meeting/Briefing Tools)]
		hotelCheckInList.html [(Arrival Control / Allotment Transfer)]
		qrScan.html	[(DCS Quick Passenger Search)]				
		notesFlags.html	[(DCS Passenger Annotations (P/Msgs)]	

✔ /destination/transfers/
		busAssignments.html [(Ground Transportation Dispatch)]
		timetables.html [(AODB Ground Transport Schedules)]
		driverSync.html [(Crew/Staff Mobile Dispatch Interface)]
		paxCounts.html [(DCS Boarding/Load Sheet Data)]

✔ /destination/airport/
		paxList.html [(DCS Passenger Manifest)]
		flightList.html [FLIGHT LIST (AODB Flight List)]
		hotelDistribution.html [(Arrival Service / Ground Handling Allocations)]
		transferList.html [(DCS Connections & Transfer Desk Tools)]
		delayMessaging.html [(SITA/ACUS Delay Code Panel (IATA 15xx codes))]					
		misconnectAlerts.html (DCS Minimum Connect Time Engine)
		gateMonitor.html 
		baggageStatus.html [(BHS (Bagage Handling System) / AHL Module)

✔ /destination/tours/
		productList.html [(Tour Operator Inventory)]
		paymentScanner.html (with nfc reader)
		qrScan.html	(same module as under paxCI)
		bookings.html [(GDS/CRS Booking Add-Ons)] 
		commissionOverview.html [(Sales Reporting)]
		eTickets.html [(EMD / Voucher Services)]

✔ /destination/guestService/
		hotlineChat.html (24/7 support for customers with a booking during their stay through "SKANDI App" to contact HotLine. Customer Service tool) [(ACUS Supervisor Messaging)]
		issueReports.html [(Service Recovery (IROP TOOLS))]
		lostFound.html [(WorldTracer / AHL)]
		accessibility.html [(Special Service Requests (SSR)]
		emergencies.html [(Emergency Ops (EOC))]

✔ /destination/hotelRelations/
		hotelDirectory.html [(Contracted Hotels Database)]
		roomingList.html [(Tour Operator Allotment Management)]
		complaintsLog.html [(CRM Customer Resolution)]
		meetingMinutes.html [(Station Management Notes)]

✔ /destination/managerPanel/ (only accessable by managers with tier 4 or 5 in airtable and Ops)
		(Visible only to supervisors/managers)
		staffRotations.html [(Roster/Crew Scheduling)
		toursInventory.html [(Product Inventory (CRM/TO backend)]
		dutySchedule.html [(Shift Planning)]
		salesReporting.html [(Retail/Ancillary Sales Reports)]
		broadcastMessages.html [(Station Wide Messaging / Shift Briefings)]
