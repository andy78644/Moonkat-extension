// This Interface is implemented to get the API Data
export default interface contractFeedBack {
  Provider: string;
  Address: string | null;
  Category: string;
  Name: string;
  Tag: Array<string>;
  Description: string;
}
