'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

    describe('Phone list view', function() {

        var phoneList,
            query;

        beforeEach(function() {
            browser.get('app/index.html');
            phoneList = element.all(by.repeater('phone in phones'));
            query = element(by.model('query'));
        });

        it('should filter the phone list as a user types into the search box', function() {
            expect(phoneList.count()).toBe(20);

            query.sendKeys('nexus');
            expect(phoneList.count()).toBe(1);

            query.clear();
            query.sendKeys('motorola');
            expect(phoneList.count()).toBe(8);
        });

        it('should display the current filter value in the title bar', function() {
            query.clear();
            expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

            query.sendKeys('nexus');
            expect(browser.getTitle()).toMatch(/Google Phone Gallery: nexus$/);
        });

        it('should be possible to control phone order via the drop down select box', function() {

            var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));

            function getNames() {
                return phoneNameColumn.then(function(phoneNameColumnVal) {
                    var result = [];
                    var promises = phoneNameColumnVal.map(function(elm) {
                        return elm.getText();
                    });

                    return Promise.all(promises)
                })
            }

            query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter
            getNames().then(function(presentValues) {
                expect(presentValues).toEqual([
                    "Motorola XOOM\u2122 with Wi-Fi",
                    "MOTOROLA XOOM\u2122"
                ]);
            });

            var elementDD = element(by.model('orderProp')).element(by.css('option[value="name"]'));


            elementDD.click()
                .then(function() {
                    getNames().then(function(presentValues) {
                        expect(presentValues).toEqual([
                            "MOTOROLA XOOM\u2122",
                            "Motorola XOOM\u2122 with Wi-Fi"
                        ]);
                    });
                });
        });

        it('should render phone specific links', function() {
            var query = element(by.model('query'));
            query.sendKeys('nexus');
            element.all(by.css('.phones li a')).first().click();
            browser.getLocationAbsUrl().then(function(url) {
                expect(url).toBe('/phones/nexus-s');
            });
        });

    });
});
