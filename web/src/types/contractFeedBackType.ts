// This Interface is implemented to get the API Data
export default interface contractFeedBack {
    Provider: string,
    Address: string,
    Category: string,
    Name: string,
    Tag: Array<string>,
  }
/*

{
  "Provider": "Provider Addr",
  "Address": "Address",
  "Category": "official/UnConfirmed",
  "Name": "AAVE Approval",
  "Tag": [
    "NFT",
    "MINT"
  ]
}
*/