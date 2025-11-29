SKANDI TRAVELS — FILE NAMING & STORAGE CONVENTION STANDARD
(Integrated with Data Field System)

Always use:
- ALL CAPS for core identifiers (SKANDI, PNR)
- Underscores `_` for spaces
- Date format: YYYYMMDD (international standard)
- No special characters (å, ä, ö → A, A, O)
- PassengerLastName = lead passenger surname only
- Destination = primary destination city or region
────────────────────────────
1. CORE NAMING PATTERN
────────────────────────────
Each file name follows this pattern:

SKANDI_[DocumentType]_[PNR]_[PassengerLastName]_[Destination]_[YYYYMMDD]

CUSTOMER-FACING (AUTO-GENERATED)
1. Booking Confirmation / eTicket [auto-fill: (PNR) (Passenger Name) (Departure Date) (Return Date) (Flights) (Hotels) (Transfers) (Total Price) (Payment Status)]
2. Flight eTicket [auto-fill: (PNR) (Passenger Name) (Flight Number) (Date) (Airline) (Class) (Baggage Allowance) (Check-in Time)]
3. Hotel Voucher [auto-fill: (PNR) (Guest Name) (Hotel Name) (Address) (Room Type) (Board Basis) (Check-in Date) (Check-out Date)]
4. Transfer Voucher [auto-fill: (PNR) (Passenger Name) (Pick-up Time) (Pick-up Location) (Driver/Company Name) (Contact Number)]
5. Tour / Excursion Voucher [auto-fill: (PNR) (Passenger Name) (Tour Name) (Date) (Meeting Point) (Start Time) (Guide Name)]
6. Full Travel Itinerary [auto-fill: (PNR) (Passenger Name) (All Booked Components) (Dates) (Times) (Emergency Contact) (Guide Assigned)]
7. Travel Information Pack [auto-fill: (PNR) (Passenger Name) (Destination) (Airline) (Flight Number) (Hotel Name)]
8. Travel Insurance Confirmation [auto-fill: (PNR) (Passenger Name) (Policy Number) (Coverage Type) (Emergency Number)]
9. Payment Receipt / Invoice [auto-fill: (Invoice No.) (PNR) (Passenger Name) (Services) (Total Amount) (Taxes) (Paid Amount) (Balance) (Payment Method)]
10. Cancellation / Refund Confirmation [auto-fill: (PNR) (Passenger Name) (Cancelled Services) (Refund Amount) (Refund Date)]
11. Post-Trip Feedback Form [auto-fill: (PNR) (Passenger Name) (Destination) (Return Date)]

INTERNAL / OPERATIONAL (AUTO-GENERATED)
12. Passenger Manifest [auto-fill: (PNR) (Passenger Names) (Flight No.) (Date) (Guide Name) (Notes)]
13. Rooming List [auto-fill: (Hotel Name) (PNR) (Passenger Names) (Room Types) (Dates)]
14. Transfer List [auto-fill: (Date) (Flight Arrival) (Bus No.) (Driver) (Guide) (Passengers)]
15. Excursion Attendance Sheet [auto-fill: (Tour Name) (Date) (Passengers) (Guide)]
16. Daily Operations Sheet [auto-fill: (Date) (Arrivals) (Departures) (Guides Assigned) (Buses) (Alerts)]
17. Incident Report Form – manual template (filled by guides).
18. Guide Handbook – static PDF/manual (training booklet).

PARTNER / SUPPLIER (MOSTLY MANUAL)
19. Hotel Contract Summary – manual Word/PDF, editable.
20. Transport Provider Agreement – manual contract form.
21. Excursion Provider Agreement – manual contract form.
22. Vendor Invoice Template – manual editable PDF.
23. Credit Authorization Form – manual fillable form (signature required).

ADMIN / SUPPORT (MIXED)
24. PNR Record Sheet [auto-fill: (PNR) (Passenger Name) (Services Booked) (Booking Status) (Date Created)]
25. Client Account Summary [auto-fill: (Client Name) (PNR) (Invoices) (Payments) (Balance)]
26. Travel Insurance Report – manual form (filled by insurance department).
27. Marketing Brochure PDF – manual design/static document.

STYLE SYSTEM (applies to all)
- Header: SKANDI logo + navy band + wave accent.
- Footer: “Charter the Scandinavian Way.” + contact info.
- Font: Montserrat (Bold headers, Regular body).
- Colors: Deep Baltic Blue #022E64, Drift Sand #E0CFAE, Turquoise #5FC7CF.
- Format: A4 portrait, editable DOCX + auto-PDF export.
- QR code (auto-fill): links to (PNR lookup URL) on confirmations/itineraries.

────────────────────────────
2. DOCUMENT STORAGE FOLDERS
────────────────────────────
Main folder: /SKANDI_TRAVELS/Documents/
Subfolders by category:

/Documents/Confirmations/
/Documents/eTickets/
/Documents/HotelVouchers/
/Documents/TransferVouchers/
/Documents/TourVouchers/
/Documents/Itineraries/
/Documents/Invoices/
/Documents/Refunds/
/Documents/Operations/
/Documents/Contracts/
/Documents/Insurance/
/Documents/Brochures/
/Documents/Archive/

Naming example:
*/Documents/Confirmations/SKANDI_Confirmation_PNR12345_HIGBERG_ORLANDO_20250612.pdf*


────────────────────────────
FIELD LINKING REFERENCE
────────────────────────────
When auto-generating document names, your booking engine uses:

FileName = "SKANDI_" + {{DocumentType}} + "_" + {{PNR}} + "_" + {{PassengerLastName}} + "_" + {{Destination}} + "_" + {{DocumentDate|format:YYYYMMDD}}

Where:
{{DocumentType}} = Confirmation / eTicket / Voucher / Invoice etc.
{{PNR}} = booking reference
{{PassengerLastName}} = lead passenger surname
{{Destination}} = main travel destination
{{DocumentDate}} = system-generated date
