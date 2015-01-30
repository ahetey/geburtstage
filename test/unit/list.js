var expect = require('chai').expect,
    rewire = require('rewire'),
    sinon = require('sinon'),
    list = rewire('../../lib/list');

describe('list', function () {
    describe('birthdays', function () {
        it('returns an array with one name when given a list of two persons, one having birthday today', function () {
            var birthdayList = [
                    {name: 'John Doe', birthday: '19741212'},
                    {name: 'Hans Mustermann', birthday: '19700101'}
                ],
                hasBirthday = sinon.stub();
            hasBirthday.withArgs('19741212').returns(true);
            hasBirthday.withArgs('19700101').returns(false);

            // jscs:disable
            list.__set__('date', { hasBirthday: hasBirthday });
            // jscs:enable

            expect(list.birthdays(birthdayList).length).to.equal(1);
        });

        it('calls hasBirthday for each person in the list and provides the birthday as argument', function () {
            var birthdayList = [
                    {name: 'John Doe', birthday: '19741212'},
                    {name: 'Hans Mustermann', birthday: '19700101'}
                ],
                hasBirthday = sinon.spy();

            // jscs:disable
            list.__set__('date', { hasBirthday: hasBirthday });
            // jscs:enable

            list.birthdays(birthdayList);

            expect(hasBirthday.callCount).to.equal(birthdayList.length);
            expect(hasBirthday.firstCall.calledWithExactly('19741212')).to.be.ok;
            expect(hasBirthday.secondCall.calledWithExactly('19700101')).to.be.ok;
        });

    });
});
