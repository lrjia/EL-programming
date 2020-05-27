#!/bin/bash
cd /www/wwwroot/www.globalpandemic.club/globe/getData
rm -fr csse_covid_19_time_series
svn checkout https://github.com/CSSEGISandData/COVID-19/trunk/csse_covid_19_data/csse_covid_19_time_series
python prodata.py