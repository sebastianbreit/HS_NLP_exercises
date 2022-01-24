import spacy


# You can add helper functions and variables if needed
nlp = spacy.load("en_core_web_sm")




def tokenize_with_pos(text):
    if not isinstance(text, str):
        return
    doc = nlp(text)
    output=[]
    for token in doc:
        output.append({"text":token.text,"start":token.idx,"end":token.idx+len(token.text)-1,"pos":token.pos_})
    return output

def get_named_entities(text):
    if not isinstance(text, str):
        return
    doc = nlp(text)
    output = []
    for ent in doc.ents:
        output.append(
            {"text": ent.text, "start": ent.start_char, "entity": ent.end_char, "pos": ent.label_})
    return output

