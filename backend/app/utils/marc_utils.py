from pymarc import Record, Field

def create_marc_record(book):
    record = Record()
    record.add_field(Field(tag='245', indicators=['0','0'], subfields=['a', book.title]))
    record.add_field(Field(tag='100', indicators=['1',' '], subfields=['a', book.author]))
    record.add_field(Field(tag='020', indicators=[' ', ' '], subfields=['a', book.isbn]))
    return record

def parse_marc_record(record):
    title = record['245']['a']
    author = record['100']['a']
    isbn = record['020']['a']
    return {'title': title, 'author': author, 'isbn': isbn}