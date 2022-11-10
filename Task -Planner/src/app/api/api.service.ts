import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { catchError, filter, map, timeout } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private _headers: HttpHeaders;

    public constructor(private _httpClient: HttpClient) {
        this._headers = new HttpHeaders();
    }

    public delete<T>(url: string, body?: object, params?: HttpParams): Observable<T> {
        return this._execute<T>('DELETE', environment.api + url, body, params);
    }

    public get<T>(url: string, params?: HttpParams): Observable<T> {
        return this._execute<T>('GET', environment.api + url, void 0, params);
    }

    public post<T>(url: string, data?: object, params?: HttpParams): Observable<T> {
        return this._execute<T>('POST', environment.api + url, data, params, null);
    }

    public put<T>(url: string, data?: object, params?: HttpParams): Observable<T> {
        return this._execute<T>('PUT', environment.api + url, data, params);
    }

    private _execute<T>(
        method: string,
        url: string,
        body?: object,
        params?: HttpParams,
        headers?: HttpHeaders,
    ): Observable<T> {
        const req = new HttpRequest(method, url, body, {
            headers: headers || this._headers,
            params,
            responseType: 'json'
        });

        return this._httpClient.request(req).pipe(
            catchError((error: any): Observable<any> => this._handleErrors(error)),
            timeout(30000),
            filter((resp) => resp.type === HttpEventType.Response),
            map((resp: HttpResponse<T>) => {
                return resp.body;
            })
        );
    }

    private _handleErrors(value: any): Observable<any> {
        throw value;
    }
}
