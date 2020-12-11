import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StringUtil {
    toTitleCase(value:string): string {
        const arrStr = value.toLowerCase().split(' ');
        const titleCaseStr = arrStr.reduce((accumulatedStr, currentStr) => {
          const spaceBetweenWords = (accumulatedStr ? ' ' : '');
          return accumulatedStr += spaceBetweenWords + (currentStr.charAt(0).toUpperCase() + currentStr.slice(1));
        }, '');
        return titleCaseStr; 
    }
}