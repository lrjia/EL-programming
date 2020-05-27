def sort():
    file_path = './second_data.txt'
    file_path1 = './sq_data.txt'
    file_path2 = './mapData.json'
    file_path3 = 'dayData.json'
    file_path4 = 'geomap.txt'

    with open(file_path, 'r') as  f:
        with open(file_path1, 'r') as r:
            with open(file_path2, 'w') as sg:
                with open(file_path3,'w') as w:
                    with open(file_path4, 'r') as g:
                        lst = f.readlines()
                        sq = r.readlines()[0].split()
                        pos = g.readlines()[0].split()
                        s = []

                        # 打印mapdata
                        sg.write('[')
                        for i in range(1, len(lst)):
                            string = ''
                            for j in range(len(sq)):
                                if int(sq[j]) == i:
                                    string += pos[j]+','
                            if string != '':
                                s.append(i)
                                sg.write('['+string[:-1]+'],')
                        sg.write(']')

                        print(s)

                        # 打印datata
                        w.write("[")
                        title = lst[0].split("\n")[0].split(",")
                        for k in range(4, len(title)):  # 从4开始
                            w.write('["%s",[' % title[k])
                            # max_num = 700000
                            max_num = 1283929

                            # 确定max
                            # for j in range(1,len(lst)):
                            #     m = int(lst[j].split('\n')[0].split(',')[k])
                            #     if m > max_num:
                            #         max_num = m

                            w.write("%.6f" % (int(lst[s[0]].split('\n')[0].split(',')[k])/max_num))
                            for i in range(1, len(s)):
                                w.write(",%.6f" % (int(lst[s[i]].split('\n')[0].split(',')[k]) / max_num))
                            w.write(']],')
                        w.write(']')
