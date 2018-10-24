//import LeadCandidateService from '../../services/lead_candidate/lead_candidate.service';
var Lead = require('./lead.model');
var Kafka = require('no-kafka');
var dataHandle = require("./dataHandler.js");

var producer = new Kafka.Producer({
  connectionString: 'kafka+ssl://ec2-52-54-116-169.compute-1.amazonaws.com:9096', // should match `listeners` SSL option in Kafka config
  ssl: {
      cert: '-----BEGIN CERTIFICATE-----\nMIIDQzCCAiugAwIBAgIBADANBgkqhkiG9w0BAQsFADAyMTAwLgYDVQQDDCdjYS1l\nZWQzZDI3Yi02YTliLTQwMTQtYjE1My0yYjUzNmZlZDIyMGMwHhcNMTgxMDE4MTA1\nMjU4WhcNMjgxMDE4MTA1MjU4WjAZMRcwFQYDVQQDDA51ODJwaTFna25nbmU2djCC\nASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM4f0MeDwWpDvheSGUcbjN9q\nCruNm/CIxPeu0dBtWDsJ09OgS3INA9PSsAWW970MyuKnkuYka2C8xMPRVY4of7l7\nQk9lVTYH+dhZiScN42GO+UyTebE+SaaarhQBcBM8+n6SPmropinAKbWLEJjPFg+/\ndjJ5vYD7Bk1e44+I0cGtlQOpe5f7Jxfm/m2hrBX4ozZ3/nd71YsMXUvKKgeXL36m\ngDBV5FInbzdQRsCT77ty3ekGBXaH069270Top07FQhIVXKSgM0tXRAQJpT11pCwG\n3XaokiqOvc3R2pHcGYZKYsqzlwksM6apGSPUX9hQPj0MqPvmztxN4zlt+rHVnFEC\nAwEAAaN9MHswHQYDVR0OBBYEFFhLiYLfZPpjmF0hSxtnfZ8rgJtQMFoGA1UdIwRT\nMFGAFE/J2ezrSsGR+cWb7YkLGG7NA6OHoTakNDAyMTAwLgYDVQQDDCdjYS1lZWQz\nZDI3Yi02YTliLTQwMTQtYjE1My0yYjUzNmZlZDIyMGOCAQAwDQYJKoZIhvcNAQEL\nBQADggEBAFv69XbGep3L6Q1t8oGECAB4zk+cTqF35YHb9ODhJtiHIEt5/oWm0nSl\nY6O0nTtZmcPlj//MM/ipZ3XzljMmW5dDd4eMf85Jv+LWGDoO7FjH6cL2p/MTCDEM\nIqh1ArcfEbiuY65Dh8nQNJ2fZLWizJBK21wS6XjKikCrtmC+nhjq6gF4VBfpSQ1r\nsgN3p/91jqhJC7L4D3B8ATRAx+ae2bEmTJDVYuDo6bWgm0m6NEqwPiK3r8hdchp0\nGQNF3gwdo8ObX+ckivfvmP1Lz7OYGUIQxG7G9txz6dX1lf7QjJ/i6S8PHMvZV9H2\nGNB9OquHcbDofmhHCJ1xDjPafEgGxug=\n-----END CERTIFICATE-----\n',
      key: '-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQEAzh/Qx4PBakO+F5IZRxuM32oKu42b8IjE967R0G1YOwnT06BL\ncg0D09KwBZb3vQzK4qeS5iRrYLzEw9FVjih/uXtCT2VVNgf52FmJJw3jYY75TJN5\nsT5JppquFAFwEzz6fpI+auimKcAptYsQmM8WD792Mnm9gPsGTV7jj4jRwa2VA6l7\nl/snF+b+baGsFfijNnf+d3vViwxdS8oqB5cvfqaAMFXkUidvN1BGwJPvu3Ld6QYF\ndofTr3bvROinTsVCEhVcpKAzS1dEBAmlPXWkLAbddqiSKo69zdHakdwZhkpiyrOX\nCSwzpqkZI9Rf2FA+PQyo++bO3E3jOW36sdWcUQIDAQABAoIBAAl8XVdRMO17AJyF\nFLS5B9qgPq4y7iI7qRTc7rrwzUaqRR1QGyi8gJiW8ZLQR8ZjeFLF83Sz6F0jUsrQ\nL2fDZV1b1slgmHNMGqtiM3Wgpf4vXjmv78HAZBNOuwQgrM+11rFMeaLh4gO53DGG\nnNTrctB2tzHLeHUfGEMnQsGwQjbveO6ak4WIDpOZp4rADH9gAz6WRGgeCwp2q/RK\nkDaK//e3bMr/1ls57a+MZecFPuiIHwxqgNJVD/YoxGHdG4tXX6pgiF/A5lJ5UPji\nlVKgx0QHQ3NztbMdokZYgpqB6KSPuBB33HEN3+DeF8Jmo85gS6h8qVL/9BNJHyYm\nxKm7m4ECgYEA6e/PKRSau1exFaTVcIqsec+hhBG5WbFynaQ/e2KzF+xXJwfMUe74\nzT+DK90KFir+KuavnfQhePx3nbWcAmB+gIKNCT8iJStQST7l5LcfcIbHo8yFm6/k\nUAEU86Ao+TX8pvj/M6MBKNJJMSCKDBq6eQdU99zU4oNIXzVE9F7pB+0CgYEA4ZB/\n1DOf5wbPySym8u9p0T6lVS/oPgOOVtR8CjimbOaQJ2Hc+rNJCbyMIhFyQlNslhqm\nxCDMBC/hOZHjnL5+3JLpMhlUy/isX8LM/IR19MPtyLZuPTMVQq6fn2Nlcpulnezf\nbi+l3sxl9ujxhj5BZWXnEkDp8CWm6/jLE9y/UXUCgYEA6brPCSVr/3f7FzvsgRgc\ngUwA/RpUTRgtAvIi9x1DAMkCvp1c+BPChBdL8FxVgpaMAcMgfbl4ZBAjVvAnonxU\niANn9HAepnJjMftk6CJKiDwxZSen6khP3dtm2o8PwQa+mvk2yZm4Q9fuhuYS50sh\nOmEn9Mmv7Wzrtyxa66mUPHUCfy3RLCXuVoyW1Z4Hc+Hkv5nBH9Qt5v6xujfo8Uki\nOKvmKWHWfwxtXmib49sHsC3IxEW5JCaygr5W+2i2OYWdLCehr7x9aLwFxv2sk/a2\n8T7GjYY3iCzmM2tYDRRTHEgrVXi+pKO9CfQ3kH6W0nhyLNZr3IPYq6wb+cv0vUtL\ni5ECgYAdFZGptO0Dd5zhuXnuqvtwV58b5hywEswVBtqxOztAehAPq4Dmn/nvHb0Z\nYZjMllPAs/8gkHuM9f9FBFk9s697NXMtPOJ9uubSbo4khAigaxrS45BjF6ZQxQKC\nCbaaJQ305YtBBE8WkXWizUolWwIH6IUR6i4G1WSICU6PYtJOpQ==\n-----END RSA PRIVATE KEY-----\n'
    }
});

var consumer = new Kafka.SimpleConsumer({
  connectionString: 'kafka+ssl://ec2-52-54-116-169.compute-1.amazonaws.com:9096', // should match `listeners` SSL option in Kafka config
  ssl: {
      cert: '-----BEGIN CERTIFICATE-----\nMIIDQzCCAiugAwIBAgIBADANBgkqhkiG9w0BAQsFADAyMTAwLgYDVQQDDCdjYS1l\nZWQzZDI3Yi02YTliLTQwMTQtYjE1My0yYjUzNmZlZDIyMGMwHhcNMTgxMDE4MTA1\nMjU4WhcNMjgxMDE4MTA1MjU4WjAZMRcwFQYDVQQDDA51ODJwaTFna25nbmU2djCC\nASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAM4f0MeDwWpDvheSGUcbjN9q\nCruNm/CIxPeu0dBtWDsJ09OgS3INA9PSsAWW970MyuKnkuYka2C8xMPRVY4of7l7\nQk9lVTYH+dhZiScN42GO+UyTebE+SaaarhQBcBM8+n6SPmropinAKbWLEJjPFg+/\ndjJ5vYD7Bk1e44+I0cGtlQOpe5f7Jxfm/m2hrBX4ozZ3/nd71YsMXUvKKgeXL36m\ngDBV5FInbzdQRsCT77ty3ekGBXaH069270Top07FQhIVXKSgM0tXRAQJpT11pCwG\n3XaokiqOvc3R2pHcGYZKYsqzlwksM6apGSPUX9hQPj0MqPvmztxN4zlt+rHVnFEC\nAwEAAaN9MHswHQYDVR0OBBYEFFhLiYLfZPpjmF0hSxtnfZ8rgJtQMFoGA1UdIwRT\nMFGAFE/J2ezrSsGR+cWb7YkLGG7NA6OHoTakNDAyMTAwLgYDVQQDDCdjYS1lZWQz\nZDI3Yi02YTliLTQwMTQtYjE1My0yYjUzNmZlZDIyMGOCAQAwDQYJKoZIhvcNAQEL\nBQADggEBAFv69XbGep3L6Q1t8oGECAB4zk+cTqF35YHb9ODhJtiHIEt5/oWm0nSl\nY6O0nTtZmcPlj//MM/ipZ3XzljMmW5dDd4eMf85Jv+LWGDoO7FjH6cL2p/MTCDEM\nIqh1ArcfEbiuY65Dh8nQNJ2fZLWizJBK21wS6XjKikCrtmC+nhjq6gF4VBfpSQ1r\nsgN3p/91jqhJC7L4D3B8ATRAx+ae2bEmTJDVYuDo6bWgm0m6NEqwPiK3r8hdchp0\nGQNF3gwdo8ObX+ckivfvmP1Lz7OYGUIQxG7G9txz6dX1lf7QjJ/i6S8PHMvZV9H2\nGNB9OquHcbDofmhHCJ1xDjPafEgGxug=\n-----END CERTIFICATE-----\n',
      key: '-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQEAzh/Qx4PBakO+F5IZRxuM32oKu42b8IjE967R0G1YOwnT06BL\ncg0D09KwBZb3vQzK4qeS5iRrYLzEw9FVjih/uXtCT2VVNgf52FmJJw3jYY75TJN5\nsT5JppquFAFwEzz6fpI+auimKcAptYsQmM8WD792Mnm9gPsGTV7jj4jRwa2VA6l7\nl/snF+b+baGsFfijNnf+d3vViwxdS8oqB5cvfqaAMFXkUidvN1BGwJPvu3Ld6QYF\ndofTr3bvROinTsVCEhVcpKAzS1dEBAmlPXWkLAbddqiSKo69zdHakdwZhkpiyrOX\nCSwzpqkZI9Rf2FA+PQyo++bO3E3jOW36sdWcUQIDAQABAoIBAAl8XVdRMO17AJyF\nFLS5B9qgPq4y7iI7qRTc7rrwzUaqRR1QGyi8gJiW8ZLQR8ZjeFLF83Sz6F0jUsrQ\nL2fDZV1b1slgmHNMGqtiM3Wgpf4vXjmv78HAZBNOuwQgrM+11rFMeaLh4gO53DGG\nnNTrctB2tzHLeHUfGEMnQsGwQjbveO6ak4WIDpOZp4rADH9gAz6WRGgeCwp2q/RK\nkDaK//e3bMr/1ls57a+MZecFPuiIHwxqgNJVD/YoxGHdG4tXX6pgiF/A5lJ5UPji\nlVKgx0QHQ3NztbMdokZYgpqB6KSPuBB33HEN3+DeF8Jmo85gS6h8qVL/9BNJHyYm\nxKm7m4ECgYEA6e/PKRSau1exFaTVcIqsec+hhBG5WbFynaQ/e2KzF+xXJwfMUe74\nzT+DK90KFir+KuavnfQhePx3nbWcAmB+gIKNCT8iJStQST7l5LcfcIbHo8yFm6/k\nUAEU86Ao+TX8pvj/M6MBKNJJMSCKDBq6eQdU99zU4oNIXzVE9F7pB+0CgYEA4ZB/\n1DOf5wbPySym8u9p0T6lVS/oPgOOVtR8CjimbOaQJ2Hc+rNJCbyMIhFyQlNslhqm\nxCDMBC/hOZHjnL5+3JLpMhlUy/isX8LM/IR19MPtyLZuPTMVQq6fn2Nlcpulnezf\nbi+l3sxl9ujxhj5BZWXnEkDp8CWm6/jLE9y/UXUCgYEA6brPCSVr/3f7FzvsgRgc\ngUwA/RpUTRgtAvIi9x1DAMkCvp1c+BPChBdL8FxVgpaMAcMgfbl4ZBAjVvAnonxU\niANn9HAepnJjMftk6CJKiDwxZSen6khP3dtm2o8PwQa+mvk2yZm4Q9fuhuYS50sh\nOmEn9Mmv7Wzrtyxa66mUPHUCfy3RLCXuVoyW1Z4Hc+Hkv5nBH9Qt5v6xujfo8Uki\nOKvmKWHWfwxtXmib49sHsC3IxEW5JCaygr5W+2i2OYWdLCehr7x9aLwFxv2sk/a2\n8T7GjYY3iCzmM2tYDRRTHEgrVXi+pKO9CfQ3kH6W0nhyLNZr3IPYq6wb+cv0vUtL\ni5ECgYAdFZGptO0Dd5zhuXnuqvtwV58b5hywEswVBtqxOztAehAPq4Dmn/nvHb0Z\nYZjMllPAs/8gkHuM9f9FBFk9s697NXMtPOJ9uubSbo4khAigaxrS45BjF6ZQxQKC\nCbaaJQ305YtBBE8WkXWizUolWwIH6IUR6i4G1WSICU6PYtJOpQ==\n-----END RSA PRIVATE KEY-----\n'
    }
});

export class Controller {


  all(req, res) {
    // LeadCandidateService.all()
    //   .then(r => res.json(r));
    //console.log(process.env.KAFKA_CERT);
    return consumer.init().then(function () {
    // Subscribe partitons 0 and 1 in a topic:
     consumer.subscribe('tombigbee-51251.first-topic', 0,{time: Kafka.EARLIEST_OFFSET}, dataHandle.dataHandler)

        // OR If you want get messages from start
        // return consumer.subscribe('kafka-test-topic', 0, {time: Kafka.EARLIEST_OFFSET}, dataHandler)
        // Please read docs for more options
        res.json('Read the kafka messages');
    });

  }

  byId(req, res) {
    LeadCandidateService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res, next) {
    // LeadCandidateService
    //   .create(req.body.name)
    //   .then(r => res
    //     .status(201)
    //     .location(`/api/lead_candidate/${r.id}`)
    //     .json(r));
    return producer.init().then(function(){
      return producer.send({
          topic: 'tombigbee-51251.first-topic',
          partition: 0,
          message: {
              value: req.body.message
          }
      });
    })
    .then(function (result) {
      /*
      [ { topic: 'kafka-test-topic', partition: 0, offset: 353 } ]
      */

      /*
      Do something after pushing message to Kafka Que
      */

      console.log(result);
    });
  }


}
export default new Controller();
