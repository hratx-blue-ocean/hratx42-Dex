// const chai = require('chai');
// const chaiHttp = require('chai-http');
// 
// const should = chai.should();
// // Tests can also be written with 'expect' rather than 'should' if desired
// // const expect = chai.expect;
// 
// chai.use(chaiHttp);
// const url='http://localhost:8000';
// let newTableId;
// 
// descrbe('POST a new table', () =>{
//   it('should post a new table to the database', ()=>{
//     chai
//       .request(url)
//       .post('/api/tables/')
//       .set('content-type', 'application/x-www-form-urlencoded')
//       .send({name: 'test'})
//       .then((err, res) => {
//         should.not.exist(err);
//         should.exist(res);
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         newTableId = res.body.id;
//         done();
//       })
//   })
// })
// 
// describe('GET tables by user id', () => {
//   it('it should GET table data', () => {
//     chai
//       .request(url)
//       .get('/api/tables/?userId=1')
//       .then((err, res) => {
//         should.not.exist(err);
//         should.exist(res);
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         done();
//       })
//       .catch(err => err);
//   });
// });
// 
// describe('GET table members', () => {
//   it('it should GET sample data', () => {
//     chai
//       .request(url)
//       .get('/api/tables/'+ newTableId + '/users')
//       .then((err, res) => {
//         should.not.exist(err);
//         should.exist(res);
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         done();
//       })
//       .catch(err => err);
//   });
// });
// 
// descrbe('DELETE the new table', () =>{
//   it('should post a new table to the database', ()=>{
//     chai
//       .request(url)
//       .delete('/api/tables/' + newTableId)
//       .then((err, res) => {
//         should.not.exist(err);
//         should.exist(res);
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         newTableId = res.body.id;
//       })
//       .then(()=>{
//         return chai
//               .request(url)
//       })
//   })
// })


// insert into dex_tables (id, name) values (1000000, 'fake test table');

