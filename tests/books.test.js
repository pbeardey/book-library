// tests/book.test.js 
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before(async () => Book.sequelize.sync());
  
    beforeEach(async () => {
      await Book.destroy({ where: {} });
    });
  
    describe('with no records in the database', () => {
      describe('POST /books', () => {
        it('creates a new book in the database', async () => {
          const response = await request(app).post('/books').send({
            title: 'Lord of the flies',
            author: 'William Goulding',
            genre: 'Allegorical Novel',
            ISBN: '978-0571191475'
          });
          const newReaderRecord = await Book.findByPk(response.body.id, {
            raw: true,
          });
  
          expect(response.status).to.equal(201);
          expect(response.body.title).to.equal('Lord of the flies');
          expect(newReaderRecord.author).to.equal('William Goulding');
          expect(newReaderRecord.genre).to.equal('Allegorical Novel');
          expect(newReaderRecord.ISBN).to.equal('978-0571191475');
        });
      });
    });
  
    describe('with records in the database', () => {
      let books;
  
      beforeEach(async () => {
        books = await Promise.all([
          Book.create({
            title: 'Lord of the flies',
            author: 'William Goulding',
            genre: 'Allegorical Novel',
            ISBN: '978-0571191475'
          }),
          Book.create({ 
            title: 'The Thursday Murder Club',
            author: 'Richard Osman',
            genre: 'Crime',
            ISBN: '978-0241425442' 
          }),
          Book.create({ 
            title: 'The Hobbit',
            author: 'J. R. R. Tolkien',
            genre: 'Fantasy',
            ISBN: '978-0261103344'
          }),
        ]);
      });
  
      describe('validate books fields', () => {
        describe('POST /books', () => {
          it('check book title is not empty', async () => {
            const response = await request(app).post('/books').send({
              title: '    ',
              author: 'William Goulding'
            });
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('A book title cannot be empty'); 
          });
          it('check book title is not null', async () => {
            const response = await request(app).post('/books').send({
              author: 'William Goulding'
            });
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('A book title is required'); 
          });

          it('check book author is not empty', async () => {
            const response = await request(app).post('/books').send({
              title: 'Lord of the Flies',
              author: '    '
            });
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('A book author cannot be empty'); 
          });
          it('check book author is not null', async () => {
            const response = await request(app).post('/books').send({
              title: 'Lord of the Flies'
            });
            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('A book author is required'); 
          });
        });
      });

      describe('GET /books', () => {
        it('gets all books records', async () => {
          const response = await request(app).get('/books');
  
          expect(response.status).to.equal(200);
          expect(response.body.length).to.equal(3);
  
          response.body.forEach((book) => {
            const expected = books.find((a) => a.id === book.id);
  
            expect(book.title).to.equal(expected.title);
            expect(book.author).to.equal(expected.author);
            expect(book.genre).to.equal(expected.genre);
            expect(book.ISBN).to.equal(expected.ISBN);
            
          });
        });
      });
  
      describe('GET /books/:id', () => {
        it('gets book record by id', async () => {
          const book = books[0];
          const response = await request(app).get(`/books/${book.id}`);
  
          expect(response.status).to.equal(200);
          expect(response.body.title).to.equal(book.title);
          expect(response.body.author).to.equal(book.author);
          expect(response.body.genre).to.equal(book.genre);
          expect(response.body.ISBN).to.equal(book.ISBN);
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app).get('/books/12345');
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
  
      describe('PATCH /books/:id', () => {
        it('updates books email by id', async () => {
          const book = books[0];
          const response = await request(app)
            .patch(`/books/${book.id}`)
            .send({ author: 'C. S. Lewis' });
          const updatedBookRecord = await Book.findByPk(book.id, {
            raw: true,
          });
  
          expect(response.status).to.equal(200);
          expect(updatedBookRecord.author).to.equal('C. S. Lewis');
        });
  
        it('returns a 404 if the reader does not exist', async () => {
          const response = await request(app)
            .patch('/books/12345')
            .send({ author: 'C. S. Lewis' });
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
  
      describe('DELETE /books/:id', () => {
        it('deletes book record by id', async () => {
          const book = books[0];
          const response = await request(app).delete(`/books/${book.id}`);
          const deletedBook = await Book.findByPk(book.id, { raw: true });
  
          expect(response.status).to.equal(204);
          expect(deletedBook).to.equal(null);
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app).delete('/books/12345');
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
    });
  });