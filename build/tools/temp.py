# -*- coding: UTF-8 -*-
import re
from bs4 import BeautifulSoup
from tools.file import File

fileTools = File()

class Instance:

    include_path = './include/'

    def getIncludeHtml(self, name):
        return fileTools.getContent(self.include_path+name+'.html').strip()

    def valueParse(self, html):
        soup = BeautifulSoup(html)
        includes = soup.select('include')
        for include in includes:
            for child in include.children:

                if "value" == child.name:
                    print child.attrs['name']
                    print child.text


    def includeParse(self, include, replaceDict):
        name = include.attrs['name']
        nameHtml = self.getIncludeHtml(name)

        for key in replaceDict:
            nameHtml = nameHtml.replace('{{'+key+'}}', replaceDict[key])

        nameHtml = re.sub(r'{{.*}}', '', nameHtml)

        include.insert_after(BeautifulSoup(nameHtml))
        include.extract()

    def htmlParse(self, html):
        soup = BeautifulSoup(html)
        includes = soup.select('include')
        for include in includes:
            replaceDict = {}
            for child in include.children:
                if "value" == child.name:
                    valueName = child.attrs['name']
                    valueText = ""
                    for valueContent in child.contents:
                        valueText += str(valueContent)

                    replaceDict[valueName] = valueText

            self.includeParse(include, replaceDict)

        return soup.prettify()
