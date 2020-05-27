import countries


def prod_sq():
    file_path = './second_data.txt'
    file_path1 = './geomap.txt'
    file_path2 = './sq_data.txt'

    with open(file_path2, 'w') as w:
        with open(file_path,'r') as f:
            with open(file_path1,'r') as g:
                lst = f.readlines()
                pos = g.readlines()[0].split()

                for s in pos:
                    lat,lng = s.split(",")
                    cc = countries.CountryChecker('TM_WORLD_BORDERS-0.3.shp')
                    name = cc.getCountry(countries.Point(int(lat),int(lng)))
                    flag = True
                    for i in range(1,len(lst)):
                        data = lst[i].split("\n")[0].split(",")

                        if data[1] in str(name):
                            w.write(str(i)+" ")
                            flag = False
                            break
                    if flag:
                        w.write("0 ")
                print("序列输出完成")
