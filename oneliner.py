import sys
print sys.argv

inputFile = sys.argv[1]
file = open(inputFile, "r");

truncatedFile = open(inputFile + "_t.js", "w");

varName = sys.argv[2]

outputText = varName + " = '" + file.read().replace('\n', '') + "'"

compiledvar = sys.argv[3]

compiledText = "\n" + compiledvar + " = " + "eth.compile.solidity(" + varName + ")\n"

output = outputText + compiledText
truncatedFile.write(output)
