file_path = './time_series_covid19_confirmed_global.csv'
file_path1 = './first_data.txt'
file_path2 = './second_data.txt'


#合并数据(特判更改;将国家相同的数据相加)
def first_co():
    with open(file_path1, 'w') as w:
        with open(file_path, 'r') as f:
            lst = f.readlines()
            i = 1
            for d in range(1, len(lst)):
                lst[d] = lst[d].replace("Korea, South", "Korea")
                lst[d] = lst[d].replace("Bonaire, Sint Eustatius and Saba", "")
                lst[d] = lst[d].replace(",Congo (Brazzaville)", "Brazzaville,Congo")
                lst[d] = lst[d].replace(",Congo (Kinshasa)", "Kinshasa,Congo")
                lst[d] = lst[d].replace(",Taiwan*", "Taiwan,China")
                lst[d] = lst[d].replace("US", "United States")
                lst[d] = lst[d].replace("Vietnam", "Viet Nam")

            while(i<len(lst)-1):
                data1 = lst[i].split("\n")[0].split(",")
                k = i+1
                while (k<len(lst)):
                    data2 = lst[k].split("\n")[0].split(",")
                    if data1[1]==data2[1] and data2[0]!='':
                        for j in range(4,len(data1)):
                            data1[j] = int(data1[j])+int(data2[j])
                        s = ""
                        for c in data1:
                            s += str(c)
                            s += ','
                        lst[i] = s[:-1]+"\n"
                        lst.remove(lst[k])
                    else:
                        k += 1
                i += 1
            print("合并完成")
            for k in range(len(lst)):
                w.write(lst[k])
            print("写入完成")

#二次合并(存在国家数据时删除部分城市的和数据)
def second_co():
    with open(file_path2, 'w') as w:
        with open(file_path1, 'r') as f:
            lst = f.readlines()
            i = 1
            while(i<len(lst)):
                flag = True
                data1 = lst[i].split("\n")[0].split(",")
                if(data1[0]==''):
                    k = 1
                    while(k<len(lst)):
                        data2 = lst[k].split("\n")[0].split(",")
                        if data1[1]==data2[1] and data2[0]!='':
                            lst.remove(lst[k])
                            if(k<i):
                                flag = False
                        else:
                            k += 1
                if flag:
                    i += 1
            for k in range(len(lst)):
                w.write(lst[k])
            print("二次合并完成")
