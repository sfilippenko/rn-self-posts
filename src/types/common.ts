export interface Post {
  id: string;
  date: string;
  booked: boolean;
  [prop: string]: any;
}
