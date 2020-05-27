def writef(x):# x==0为累计，x==1为新增
    file_path1 = './geomap.txt'  # 坐标点
    file_path3 = './sq_data.txt'  # 序列
    file_path = './second_data.txt'  # 数据源
    if x==0:
        file_path2 = './new_data.json'  # 输出源
    elif x==1:
        file_path2 = './increase_data.json'  # 输出源

    with open(file_path2, 'w') as w:
        with open(file_path,'r') as f:
            with open(file_path1,'r') as g:
                with open(file_path3, 'r') as r:
                    lst = f.readlines()
                    pos = g.readlines()[0].split()
                    sq = r.readlines()[0].split()

                    w.write("[")
                    title = lst[0].split("\n")[0].split(",")
                    for k in range(4,len(title)):# 从4开始
                        w.write('["%s",[' %title[k])
                        if x==0:
                            maxnum = 70000
                            for j in range(1,len(lst)):
                                m = int(lst[j].split("\n")[0].split(",")[k])
                                if m>maxnum:
                                    maxnum = m
                            w.write("%s,%.6f"%(pos[0],int(lst[int(sq[0])].split("\n")[0].split(",")[k])/maxnum))

                        elif x==1:
                            maxnum = 1283929
                            if k == 4:
                                w.write("%s,%.6f" % (pos[0], int(lst[int(sq[0])].split("\n")[0].split(",")[k]) / maxnum))
                            else:
                                w.write("%s,%.6f"%(pos[0], (int(lst[int(sq[0])].split("\n")[0].split(",")[k]) -
                                                        int(lst[int(sq[0])].split("\n")[0].split(",")[k-1]))/maxnum))

                        for i in range(1,len(pos)):
                            if(sq[i]=='0'): # or (lst[int(sq[i])].split("\n")[0].split(",")[k]=='0'):
                                continue
                            if x==0:
                                w.write(",%s,%.6f"%(pos[i],int(lst[int(sq[i])].split("\n")[0].split(",")[k])/maxnum))
                            elif x==1:
                                if k == 4:
                                    w.write(",%s,%.6f" % (pos[i], int(lst[int(sq[i])].split("\n")[0].split(",")[k]) / maxnum))
                                else:
                                    w.write(",%s,%.6f" % (pos[i], (int(lst[int(sq[i])].split("\n")[0].split(",")[k]) -
                                                        int(lst[int(sq[0])].split("\n")[0].split(",")[k - 1])) / maxnum))
                        w.write("]],")
                    w.write("]")
