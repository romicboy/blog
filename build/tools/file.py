# -*- coding: UTF-8 -*-
import os
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

class File:

    def getFileList(self, path):
        dirs = os.listdir(path)
        files = []
        for file in dirs:
            if file.find('html') != -1:
                files.append(file)

        return files

    def getContent(self, file):
        file_object = open(file)
        try:
            all_the_text = file_object.read()
        finally:
            file_object.close()
        return all_the_text

    def putContent(self, file, content):
        file_object = open(file, 'w')
        file_object.write(content)
        file_object.close()