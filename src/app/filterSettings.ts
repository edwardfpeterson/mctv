import { Violation } from './violation';
//class to store all the information being sent to the server for requests.
export class FilterSettings {
    template: Violation = new Violation();
    resultCount: number = 100; // results per page.
    page: number = 0;
}