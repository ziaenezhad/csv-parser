import CSV from '../src/index';

const data = `Username; Identifier;First name;Last name
booker12;9012;Rachel;Booker
grey07;2070;Laura;Grey
johnson81;4081;Craig;Johnson
jenkins46;9346;Mary;Jenkins
smith79;5079;Jamie;Smith
`;
test('CSV to Array', function() {
    const csv = new CSV(data, ';');
    expect(csv.toArray()).toEqual([
        ['Username', ' Identifier', 'First name', 'Last name'],
        ['booker12', '9012', 'Rachel', 'Booker'],
        ['grey07', '2070', 'Laura', 'Grey'],
        ['johnson81', '4081', 'Craig', 'Johnson'],
        ['jenkins46', '9346', 'Mary', 'Jenkins'],
        ['smith79', '5079', 'Jamie', 'Smith'],
    ]);
});
