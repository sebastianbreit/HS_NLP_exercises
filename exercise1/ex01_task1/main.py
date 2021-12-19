import csv
import spacy
import logging
logging.basicConfig(level=logging.DEBUG)


def posTagging(doc):
    # Regarding part 2 of the bonus exercise, I did not understand what is
    # meant with start and end indices of a token
    out_pos = []

    header = ["Text", "POS Tag", "Named Entity Label"]
    out_pos.append(header)

    for sent in doc.sents:
        for token in sent:
            out_pos.append([token.text, token.pos_, token.ent_type_])
        # After sentence append newline
        out_pos.append(["", "", ""])
    return out_pos


def namedEntities(doc):
    out_entities = []
    header = ["Text", "Start Index", "End Index", "Label"]
    out_entities.append(header)
    for ent in doc.ents:
        out_entities.append(
            [ent.text, ent.start_char, ent.end_char, ent.label_])
    return out_entities


def write_to_file(file, content):
    with open(file, 'w') as f:
        # create the csv writer
        writer = csv.writer(f, delimiter='\t')

        # write a row to the csv file
        writer.writerows(content)


def main():
    nlp = spacy.load("en_core_web_sm")
    example_string = ""
    with open('example.txt', "r") as file:
        example_string = file.read()
    doc = nlp(example_string)

    write_to_file('pos_example.csv', posTagging(doc))
    write_to_file('entities_example.csv', namedEntities(doc))


if __name__ == "__main__":
    main()
