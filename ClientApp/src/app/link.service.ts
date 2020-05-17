import { Injectable } from '@angular/core';


@Injectable()

export class LinkService {
  // This is the main root url that all the forms are using
  // With the time constraint, we were unable to figure out how to do a WebConfigApp File to do this change.
  // Thus, when deploying, please check this URL to the respective root URL.
  readonly ROOT_URL = 'http://127.0.0.1/api/v1/'

}
