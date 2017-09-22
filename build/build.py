# coding=utf-8

from tools import temp
from tools.file import File

fileTools = File()
tempTools = temp.Instance()

source_path     = './source/'
scr_path        = '../'

files = fileTools.getFileList(source_path)

for file in files:

    html = fileTools.getContent(source_path+file)
    fileTools.putContent(scr_path+file, tempTools.htmlParse(html))
