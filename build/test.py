# -*- coding: UTF-8 -*-
from tools import temp
from tools.file import File


def main():

    fileTools = File()
    tempTools = temp.Instance()

    htmlPath = "./source/index.html"

    html = fileTools.getContent(htmlPath)

    fileTools.putContent("./src/index.html", tempTools.htmlParse(html))
    # tempTools.valueParse(html)


if __name__ == '__main__':
    main()
