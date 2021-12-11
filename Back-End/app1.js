// ***************************************************************************
// Copyright (c) 2017 SAP AG or an SAP affiliate company. All rights reserved.
// ***************************************************************************
// This sample code is provided AS IS, without warranty or liability of any kind.
//
// You may use, reproduce, modify and distribute this sample code without limitation,
// on the condition that you retain the foregoing copyright notice and disclaimer
// as to the original code.
// ***************************************************************************

// This example uses waterfall.
// npm install async-waterfall

'use strict';

var util = require('util');
var waterfall = require('async-waterfall');
var hana = require('@sap/hana-client');


// // HANA Cloud Cloud Example
// // DigiCert Global Root CA: https://cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem
//
// var connOptions = {
//     serverNode: '12345678-abcd-12ab-34cd-1234abcd.hana.hanacloud.ondemand.com:443',
//     uid: 'User1',o
//     pwd: 'Password123',
//     encrypt: 'true',
//     ssltruststore: '-----BEGIN CERTIFICATE-----MIIDrzCCApegAwIBAgIQCDvgVpBCRrGhdWrJWZHHSjANBgkqhkiG9w0BAQUFADBhMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3d3cuZGlnaWNlcnQuY29tMSAwHgYDVQQDExdEaWdpQ2VydCBHbG9iYWwgUm9vdCBDQTAeFw0wNjExMTAwMDAwMDBaFw0zMTExMTAwMDAwMDBaMGExCzAJBgNVBAYTAlVTMRUwEwYDVQQKEwxEaWdpQ2VydCBJbmMxGTAXBgNVBAsTEHd3dy5kaWdpY2VydC5jb20xIDAeBgNVBAMTF0RpZ2lDZXJ0IEdsb2JhbCBSb290IENBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4jvhEXLeqKTTo1eqUKKPC3eQyaKl7hLOllsBCSDMAZOnTjC3U/dDxGkAV53ijSLdhwZAAIEJzs4bg7/fzTtxRuLWZscFs3YnFo97nh6Vfe63SKMI2tavegw5BmV/Sl0fvBf4q77uKNd0f3p4mVmFaG5cIzJLv07A6Fpt43C/dxC//AH2hdmoRBBYMql1GNXRor5H4idq9Joz+EkIYIvUX7Q6hL+hqkpMfT7PT19sdl6gSzeRntwi5m3OFBqOasv+zbMUZBfHWymeMr/y7vrTC0LUq7dBMtoM1O/4gdW7jVg/tRvoSSiicNoxBN33shbyTApOB6jtSj1etX+jkMOvJwIDAQABo2MwYTAOBgNVHQ8BAf8EBAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAdBgNVHQ4EFgQUA95QNVbRTLtm8KPiGxvDl7I90VUwHwYDVR0jBBgwFoAUA95QNVbRTLtm8KPiGxvDl7I90VUwDQYJKoZIhvcNAQEFBQADggEBAMucN6pIExIK+t1EnE9SsPTfrgT1eXkIoyQY/EsrhMAtudXH/vTBH1jLuG2cenTnmCmrEbXjcKChzUyImZOMkXDiqw8cvpOp/2PV5Adg06O/nVsJ8dWO41P0jmP6P6fbtGbfYmbW0W5BjfIttep3Sp+dWOIrWcBAI+0tKIJFPnlUkiaY4IBIqDfv8NZ5YBberOgOzW6sRBc4L0na4UU+Krk2U886UAb3LujEV0lsYSEY1QSteDwsOoBrp+uvFRTp2InBuThs4pFsiv9kuXclVzDAGySj4dzp30d8tbQkCAUw7C29C79Fv1C5qfPrmAESrciIxpg0X40KPMbp1ZWVbd4=-----END CERTIFICATE-----'
// };

// HANA Platform Example
var connOptions = {
    serverNode: 'myserver:30015',
    uid: 'User1',
    pwd: 'Password123'
};

var connection = hana.createConnection();

var tasks = [myconn,
    mycreatetable,
    mysql1, myexecute, myresults,
    mysql2, myexecute, myresults,
    mydisco];

waterfall(tasks, done);
console.log("Async calls underway\n");

function myconn(cb) {
    connection.connect(connOptions);
    cb(null);
}

function mycreatetable(cb) {
    var err = null;

    try {
        connection.exec("CREATE TABLE Employees(EmployeeID integer primary key, GivenName varchar(64), Surname varchar(64) )");
        connection.exec("INSERT INTO Employees VALUES(102, 'Fran',    'Whitney')");
        connection.exec("INSERT INTO Employees VALUES(105, 'Matthew', 'Cobb')");
        connection.exec("INSERT INTO Employees VALUES(129, 'Philip',  'Chin')");
        connection.exec("INSERT INTO Employees VALUES(207, 'Julie',   'Jordan')");
        connection.exec("INSERT INTO Employees VALUES(243, 'Robert',  'Breault')");
        connection.exec("INSERT INTO Employees VALUES(247, 'Melissa', 'Espinoza')");
    } catch (error) {
        console.log(error);
        console.log("");
    }

    cb(null);
}

function mysql1(cb) {
    var fields = ['EmployeeID', 'GivenName', 'Surname'];
    var range = [100, 199];
    var sql = util.format(
        'SELECT %s FROM Employees ' +
        'WHERE EmployeeID BETWEEN %s',
        fields.join(','), range.join(' AND '));
    console.log("SQL statement: " + sql);
    cb(null, sql);
}

function mysql2(cb) {
    var fields = ['EmployeeID', 'GivenName', 'Surname'];
    var range = [200, 299];
    var sql = util.format(
        'SELECT %s FROM Employees ' +
        'WHERE EmployeeID BETWEEN %s',
        fields.join(','), range.join(' AND '));
    console.log("SQL statement: " + sql);
    cb(null, sql);
}

function myexecute(sql, cb) {
    var rows = connection.exec(sql);
    cb(null, rows);
}

function myresults(rows, cb) {
    console.log(util.inspect(rows, { colors: true }));
    console.log("");
    cb(null);
}

function mydisco(cb) {
    connection.disconnect(cb);
}

function done(err) {
    console.log("Async done");
    if (err) {
        return console.error(err);
    }
}
