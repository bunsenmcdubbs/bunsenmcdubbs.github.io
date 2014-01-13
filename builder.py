#!/usr/bin/python

import markdown
import sys, time, codecs

# defaults
config = "site.config"
etc_dir = "other/" # default directory to find header and footer
author = "Andrew Dai" # default author
title = author+"'s thoughts from " + time.strftime("%d/%m/%Y")

def loadConfig(configFile = config):
	try:
		f = open(config)
	except IOError:
		print "Warning: No config file found at " + config
		return
	# parsing time!
	for line in f:
		findAndSet(line, "etc_dir", etc_dir)
		findAndSet(line, "author", author)

# sets var to the value following name in string
def findAndSet(string, name, var):
	if name in string:
		temp = line.partition(":")[2].strip()
		if len(temp) != 0:
			var = temp
		else:
			return -1;

# loads the Markdown source, loading info if it finds it
def loadMDtoHTML(filename):
	try:
		input_file = codecs.open(filename, mode="r", encoding="utf-8")
	except IOError:
		print "Fatal: No article content found"
		sys.exit(2)
	text = input_file.read()
	html = markdown.markdown(text)
	#print html
	return html

def loadHeader():
	try:
		input_file = codecs.open(etc_dir + "header.html", mode="r", encoding="utf-8")
	except IOError:
		print "Warning: No header found"
		return ""
	html = input_file.read()
	return html

def loadFooter():
	try:
		input_file = codecs.open(etc_dir + "footer.html", mode="r", encoding="utf-8")
	except IOError:
		print "Warning: No footer found"
		return ""
	html = input_file.read()
	return html

def combine(content, header, footer):
	html = ""
	html += header + "\n"
	html += "<body>\n"
	html += "<div id = content>\n"
	html += content
	html += "</div>\n"
	html += "</body>\n"
	html += footer + "\n"
	#print html
	return html

def write(html, filename):
	output_file = codecs.open(filename, "w", encoding="utf-8", errors="xmlcarrefreplace")
	output_file.write(html)

def main(argv):
	if len(argv) != 1 and len(argv) != 2:
		print ("usage: builder.py <infile> <outfile>")
		sys.exit(2)
	loadConfig()
	content = loadMDtoHTML(argv[0])
	header = loadHeader()
	footer = loadFooter()
	html = combine(content, header, footer)
	outfile = argv[0].partition(".")[0].strip() + ".html"
	if len(argv) == 2:
		outfile = argv[1]
	write(html, outfile)
	print outfile

if __name__ == "__main__":
	main(sys.argv[1:])
