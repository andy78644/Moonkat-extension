// This Interface is implemented to get the API Data
export default interface contractFeedBack {
  Provider: string;
  Address: string;
  Name: string;
  isMalicious: Boolean;
  Tag: Array<string>;
  Description: string;
}
