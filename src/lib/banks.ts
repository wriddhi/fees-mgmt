export const publicBanks = [
  "Bank of Baroda",
  "Bank of India",
  "Bank of Maharashtra",
  "Canara Bank",
  "Central Bank of India",
  "Indian Bank",
  "Indian Overseas Bank",
  "Punjab and Sind Bank",
  "Punjab National Bank",
  "State Bank of India",
  "UCO Bank",
  "Union Bank of India",
];

export const privateBanks = [
  "Axis Bank",
  "Bandhan Bank",
  "CSB Bank",
  "City Union Bank",
  "DCB Bank",
  "Dhanlaxmi Bank",
  "Federal Bank",
  "HDFC Bank",
  "ICICI Bank",
  "IDBI Bank",
  "IDFC First Bank",
  "IndusInd Bank",
  "Jammu & Kashmir Bank",
  "Karnataka Bank",
  "Karur Vysya Bank",
  "Kotak Mahindra Bank",
  "Nainital Bank",
  "RBL Bank",
  "South Indian Bank",
  "Tamilnad Mercantile Bank",
  "Yes Bank"
]

export const allBanks = [...publicBanks, ...privateBanks];

export const banks = allBanks.map((bank) => (bank.toUpperCase()));