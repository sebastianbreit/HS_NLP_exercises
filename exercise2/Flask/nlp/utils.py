import spacy


# You can add helper functions and variables if needed
nlp = spacy.load("en_core_web_sm")




def tokenize_with_pos(text):
    """
    This function should take a string as input , process it with the "en_core_web_sm"
    spacy pipeline and return a list of token representations. Tokens should be represented
    by dictionaries as follows: {"text": token text, "start": token start char index, "end": token char offset,
             "pos": human readable token POS tag}
    Complete the function body
    """
    if not isinstance(text, str):
        return
    doc = nlp(text)
    output=[]
    for token in doc:
        output.append({"text":token.text,"start":token.idx,"end":token.idx+len(token.text)-1,"pos":token.pos_})
    return output

def get_named_entities(text):
    """
    This function should take a string as input , process it with the "en_core_web_sm"
    spacy pipeline and return a list of named entity representations. Entities should be represented
    by dictionaries as follows: {"text": entity text, "start": entity start char index, "entity": token char offset,
             "ne_label": human readable entity label}
    Complete the function body
    """
    if not isinstance(text, str):
        return
    doc = nlp(text)
    output = []
    for ent in doc.ents:
        output.append(
            {"text": ent.text, "start": ent.start_char, "entity": ent.end_char, "pos": ent.label_})
    return output

