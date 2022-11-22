/**
 * @ Author: Jbristhuille
 * @ Create Time: 2022-10-25 16:43:39
 * @ Description: Format data before API response
 */

/* SUMMARY
    * Nest
    * Name: fromArray
    * Name: fromObject
*/

/* Nest */
import { Injectable } from '@nestjs/common';
/***/

@Injectable()
export class FormatService {
    /*
    * Name: fromArray
    * Description: Format in specified constructor from array data
    * 
    * Args:
    * - data (Any[]): Array data
    * - constructor(Any): Specified constructor
    * 
    * Return (Any[]): Formatted data
    */
    public fromArray(data: any[], constructor: any): any[] {
        let ret = [];

        data.forEach((el) => {
            ret.push(new constructor(el));
        });

        return ret;
    }
    /***/

    /*
    * Name: fromObject
    * Description: Format object data with specified constructor
    * 
    * Args:
    * - data (Any): Data to format
    * - constructor (Any): Specified constructor
    * 
    * Return (Any): Formatted data
    */
    public fromObject(data: any, constructor: any): any {
        return new constructor(data);
    }
    /***/
}
