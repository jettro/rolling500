import re


def read_lines(lines):
    regex = re.compile('(.*):(.*):(\d)')
    r_val = []
    for line in lines:
        m = re.match(regex, line)
        if m:
            r_item = {'query': m.group(1), 'document_id': m.group(2), 'relevance': m.group(3)}
            r_val.append(r_item)

    return r_val


def determine_queries(lines):
    query_map = {}

    for line in lines:
        if line['query'] not in query_map:
            query_map[line['query']] = len(query_map) + 1

    return query_map


def write_query_part(queries, write_to):
    for key, value in queries.items():
        write_to.write('# qid:%s: %s\n' % (value, key))


def read_implicit_feedback(filename, write_to):
    with open(filename) as f:
        lines = read_lines(f)
        queries = determine_queries(lines)
        write_query_part(queries, write_to)

        write_to.write('#\n')
        write_to.write('#\n')

        for one_line in lines:
            write_to.write('%s qid:%s # %s\n' % (one_line['relevance'],
                                                 queries[one_line['query']],
                                                 one_line['document_id']))


if __name__ == "__main__":
    with open('implicit_judgements.txt', 'w') as judgmentFile:
        read_implicit_feedback(filename='DBN_output.log', write_to=judgmentFile)

