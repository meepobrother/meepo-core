import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
@Injectable()
export class DateTimeService {

    constructor(
        public util: UtilService
    ) { }

    renderDateTime(template: string, value: DateTimeData, locale: LocaleData) {
        if (this.util.isBlank(value)) {
            return '';
        }
        let tokens: string[] = [];
        let hasText = false;
        FORMAT_KEYS.forEach((format, index) => {
            if (template.indexOf(format.f) > -1) {
                const token = '{' + index + '}';
                const text = this.renderTextFormat(format.f, (<any>value)[format.k], value, locale);
                if (!hasText && text && this.util.isPresent((<any>value)[format.k])) {
                    hasText = true;
                }
                tokens.push(token, text);
                template = template.replace(format.f, token);
            }
        });
        if (!hasText) {
            return '';
        }
        for (let i = 0; i < tokens.length; i += 2) {
            template = template.replace(tokens[i], tokens[i + 1]);
        }
        return template;
    }

    renderTextFormat(format: string, value: any, date: DateTimeData, locale: LocaleData): string {
        if (format === FORMAT_DDDD || format === FORMAT_DDD) {
            try {
                value = (new Date(date.year, date.month - 1, date.day)).getDay();
                if (format === FORMAT_DDDD) {
                    return (this.util.isPresent(locale.dayNames) ? locale.dayNames : DAY_NAMES)[value];
                }
                return (this.util.isPresent(locale.dayShortNames) ? locale.dayShortNames : DAY_SHORT_NAMES)[value];
            } catch (e) { }
            return '';
        }
        if (format === FORMAT_A) {
            return date ? date.hour < 12 ? 'AM' : 'PM' : this.util.isPresent(value) ? value.toUpperCase() : '';
        }
        if (format === FORMAT_a) {
            return date ? date.hour < 12 ? 'am' : 'pm' : this.util.isPresent(value) ? value : '';
        }
        if (this.util.isBlank(value)) {
            return '';
        }
        if (format === FORMAT_YY || format === FORMAT_MM ||
            format === FORMAT_DD || format === FORMAT_HH ||
            format === FORMAT_mm || format === FORMAT_ss) {
            return this.twoDigit(value);
        }
        if (format === FORMAT_YYYY) {
            return this.fourDigit(value);
        }
        if (format === FORMAT_MMMM) {
            return (this.util.isPresent(locale.monthNames) ? locale.monthNames : MONTH_NAMES)[value - 1];
        }
        if (format === FORMAT_MMM) {
            return (this.util.isPresent(locale.monthShortNames) ? locale.monthShortNames : MONTH_SHORT_NAMES)[value - 1];
        }
        if (format === FORMAT_hh || format === FORMAT_h) {
            if (value === 0) {
                return '12';
            }
            if (value > 12) {
                value -= 12;
            }
            if (format === FORMAT_hh && value < 10) {
                return ('0' + value);
            }
        }
        return value.toString();
    }

    dateValueRange(format: string, min: DateTimeData, max: DateTimeData): any[] {
        let opts: any[] = [];
        let i: number;
        if (format === FORMAT_YYYY || format === FORMAT_YY) {
            i = max.year;
            while (i >= min.year) {
                opts.push(i--);
            }
        } else if (format === FORMAT_MMMM || format === FORMAT_MMM ||
            format === FORMAT_MM || format === FORMAT_M ||
            format === FORMAT_hh || format === FORMAT_h) {
            for (i = 1; i < 13; i++) {
                opts.push(i);
            }
        } else if (format === FORMAT_DDDD || format === FORMAT_DDD ||
            format === FORMAT_DD || format === FORMAT_D) {
            for (i = 1; i < 32; i++) {
                opts.push(i);
            }
        } else if (format === FORMAT_HH || format === FORMAT_H) {
            for (i = 0; i < 24; i++) {
                opts.push(i);
            }
        } else if (format === FORMAT_mm || format === FORMAT_m) {
            for (i = 0; i < 60; i++) {
                opts.push(i);
            }
        } else if (format === FORMAT_ss || format === FORMAT_s) {
            for (i = 0; i < 60; i++) {
                opts.push(i);
            }
        } else if (format === FORMAT_A || format === FORMAT_a) {
            opts.push('am', 'pm');
        }
        return opts;
    }

    parseDate(val: any): DateTimeData {
        let parse: any[];
        if (this.util.isPresent(val) && val !== '') {
            parse = TIME_REGEXP.exec(val);
            if (this.util.isPresent(parse)) {
                parse.unshift(undefined, undefined);
                parse[2] = parse[3] = undefined;

            } else {
                parse = ISO_8601_REGEXP.exec(val);
            }
        }
        if (this.util.isBlank(parse)) {
            return null;
        }
        for (let i = 1; i < 8; i++) {
            parse[i] = (parse[i] !== undefined ? parseInt(parse[i], 10) : null);
        }
        let tzOffset = 0;
        if (this.util.isPresent(parse[9]) && this.util.isPresent(parse[10])) {
            tzOffset = parseInt(parse[10], 10) * 60;
            if (this.util.isPresent(parse[11])) {
                tzOffset += parseInt(parse[11], 10);
            }
            if (parse[9] === '-') {
                tzOffset *= -1;
            }
        }
        return {
            year: parse[1],
            month: parse[2],
            day: parse[3],
            hour: parse[4],
            minute: parse[5],
            second: parse[6],
            millisecond: parse[7],
            tzOffset: tzOffset,
        };
    }

    dateDataSortValue(data: DateTimeData): number {
        if (data) {
            return this.dateSortValue(data.year, data.month, data.day, data.hour, data.minute);
        }
        return -1;
    }

    dateSortValue(year: number, month: number, day: number, hour: number = 0, minute: number = 0): number {
        return parseInt(`1${this.fourDigit(year)}${this.twoDigit(month)}${this.twoDigit(day)}${this.twoDigit(hour)}${this.twoDigit(minute)}`, 10);
    }

    daysInMonth(month: number, year: number): number {
        return (month === 4 || month === 6 || month === 9 || month === 11) ? 30 : (month === 2) ? this.isLeapYear(year) ? 29 : 28 : 31;
    }

    isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    twoDigit(val: number): string {
        return ('0' + (this.util.isPresent(val) ? Math.abs(val) : '0')).slice(-2);
    }

    threeDigit(val: number): string {
        return ('00' + (this.util.isPresent(val) ? Math.abs(val) : '0')).slice(-3);
    }

    fourDigit(val: number): string {
        return ('000' + (this.util.isPresent(val) ? Math.abs(val) : '0')).slice(-4);
    }

    updateDate(existingData: DateTimeData, newData: any): boolean {
        if (this.util.isPresent(newData) && newData !== '') {
            if (this.util.isString(newData)) {
                newData = this.parseDate(newData);
                if (newData) {
                    Object.assign(existingData, newData);
                    return true;
                }
            } else if ((this.util.isPresent(newData.year) || this.util.isPresent(newData.hour) || this.util.isPresent(newData.month) || this.util.isPresent(newData.day) || this.util.isPresent(newData.minute) || this.util.isPresent(newData.second))) {
                if (this.util.isPresent(newData.ampm) && this.util.isPresent(newData.hour)) {
                    if (newData.ampm.value === 'pm') {
                        newData.hour.value = (newData.hour.value === 12 ? 12 : newData.hour.value + 12);
                    } else {
                        newData.hour.value = (newData.hour.value === 12 ? 0 : newData.hour.value);
                    }
                }
                for (const k in newData) {
                    (<any>existingData)[k] = newData[k].value;
                }
                return true;
            }
            console.warn(`Error parsing date: "${newData}". Please provide a valid ISO 8601 datetime format: https://www.w3.org/TR/NOTE-datetime`);
        } else {
            for (const k in existingData) {
                delete (<any>existingData)[k];
            }
        }
        return false;
    }


    compareDates(d1: DateTimeData, d2: DateTimeData): number {
        const date1 = new Date(d1.year, d1.month, d1.day, d1.hour, d1.minute, d1.second);
        const date2 = new Date(d2.year, d2.month, d2.day, d2.hour, d2.minute, d2.second);
        return date1.getTime() - date2.getTime();
    }

    parseTemplate(template: string): string[] {
        const formats: string[] = [];
        template = template.replace(/[^\w\s]/gi, ' ');
        FORMAT_KEYS.forEach(format => {
            if (format.f.length > 1 && template.indexOf(format.f) > -1 && template.indexOf(format.f + format.f.charAt(0)) < 0) {
                template = template.replace(format.f, ' ' + format.f + ' ');
            }
        });
        const words = template.split(' ').filter(w => w.length > 0);
        words.forEach((word, i) => {
            FORMAT_KEYS.forEach(format => {
                if (word === format.f) {
                    if (word === FORMAT_A || word === FORMAT_a) {
                        if ((formats.indexOf(FORMAT_h) < 0 && formats.indexOf(FORMAT_hh) < 0) ||
                            VALID_AMPM_PREFIX.indexOf(words[i - 1]) === -1) {
                            return;
                        }
                    }
                    formats.push(word);
                }
            });
        });
        return formats;
    }

    getValueFromFormat(date: DateTimeData, format: string) {
        if (format === FORMAT_A || format === FORMAT_a) {
            return (date.hour < 12 ? 'am' : 'pm');
        }
        if (format === FORMAT_hh || format === FORMAT_h) {
            return (date.hour > 12 ? date.hour - 12 : date.hour);
        }
        return (<any>date)[this.convertFormatToKey(format)];
    }

    convertFormatToKey(format: string): string {
        for (const k in FORMAT_KEYS) {
            if (FORMAT_KEYS[k].f === format) {
                return FORMAT_KEYS[k].k;
            }
        }
        return null;
    }

    convertDataToISO(data: DateTimeData): string {
        let rtn = '';
        if (this.util.isPresent(data)) {
            if (this.util.isPresent(data.year)) {
                rtn = this.fourDigit(data.year);
                if (this.util.isPresent(data.month)) {
                    rtn += '-' + this.twoDigit(data.month);
                    if (this.util.isPresent(data.day)) {
                        rtn += '-' + this.twoDigit(data.day);
                        if (this.util.isPresent(data.hour)) {
                            rtn += `T${this.twoDigit(data.hour)}:${this.twoDigit(data.minute)}:${this.twoDigit(data.second)}`;
                            if (data.millisecond > 0) {
                                rtn += '.' + this.threeDigit(data.millisecond);
                            }
                            if (this.util.isBlank(data.tzOffset) || data.tzOffset === 0) {
                                rtn += 'Z';
                            } else {
                                rtn += (data.tzOffset > 0 ? '+' : '-') + this.twoDigit(Math.floor(data.tzOffset / 60)) + ':' + this.twoDigit(data.tzOffset % 60);
                            }
                        }
                    }
                }

            } else if (this.util.isPresent(data.hour)) {
                rtn = this.twoDigit(data.hour) + ':' + this.twoDigit(data.minute);
                if (this.util.isPresent(data.second)) {
                    rtn += ':' + this.twoDigit(data.second);
                    if (this.util.isPresent(data.millisecond)) {
                        rtn += '.' + this.threeDigit(data.millisecond);
                    }
                }
            }
        }
        return rtn;
    }
}

export interface DateTimeData {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    tzOffset?: number;
}

export interface LocaleData {
    monthNames?: string[];
    monthShortNames?: string[];
    dayNames?: string[];
    dayShortNames?: string[];
}

const ISO_8601_REGEXP = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
const TIME_REGEXP = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;

const FORMAT_YYYY = 'YYYY';
const FORMAT_YY = 'YY';
const FORMAT_MMMM = 'MMMM';
const FORMAT_MMM = 'MMM';
const FORMAT_MM = 'MM';
const FORMAT_M = 'M';
const FORMAT_DDDD = 'DDDD';
const FORMAT_DDD = 'DDD';
const FORMAT_DD = 'DD';
const FORMAT_D = 'D';
const FORMAT_HH = 'HH';
const FORMAT_H = 'H';
const FORMAT_hh = 'hh';
const FORMAT_h = 'h';
const FORMAT_mm = 'mm';
const FORMAT_m = 'm';
const FORMAT_ss = 'ss';
const FORMAT_s = 's';
const FORMAT_A = 'A';
const FORMAT_a = 'a';

const FORMAT_KEYS = [
    { f: FORMAT_YYYY, k: 'year' },
    { f: FORMAT_MMMM, k: 'month' },
    { f: FORMAT_DDDD, k: 'day' },
    { f: FORMAT_MMM, k: 'month' },
    { f: FORMAT_DDD, k: 'day' },
    { f: FORMAT_YY, k: 'year' },
    { f: FORMAT_MM, k: 'month' },
    { f: FORMAT_DD, k: 'day' },
    { f: FORMAT_HH, k: 'hour' },
    { f: FORMAT_hh, k: 'hour' },
    { f: FORMAT_mm, k: 'minute' },
    { f: FORMAT_ss, k: 'second' },
    { f: FORMAT_M, k: 'month' },
    { f: FORMAT_D, k: 'day' },
    { f: FORMAT_H, k: 'hour' },
    { f: FORMAT_h, k: 'hour' },
    { f: FORMAT_m, k: 'minute' },
    { f: FORMAT_s, k: 'second' },
    { f: FORMAT_A, k: 'ampm' },
    { f: FORMAT_a, k: 'ampm' },
];

const DAY_NAMES = [
    '周日',
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
];

const DAY_SHORT_NAMES = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
];

const MONTH_NAMES = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
];

const MONTH_SHORT_NAMES = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
];

const VALID_AMPM_PREFIX = [
    FORMAT_hh, FORMAT_h, FORMAT_mm, FORMAT_m, FORMAT_ss, FORMAT_s
];