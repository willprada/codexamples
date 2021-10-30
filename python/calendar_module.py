import calendar

cal = calendar.TextCalendar(calendar.SUNDAY)
txt_cal = cal.formatmonth(2021, 2, 0, 0)
print(txt_cal)

print()
hcal = calendar.HTMLCalendar(calendar.SUNDAY)
html_cal = hcal.formatmonth(2021, 4)
print(html_cal)

# iterate over days of month
print()
for i in cal.itermonthdays(2021, 4):
    print(i)

print()
for name in calendar.month_name:
    print(name)

for day in calendar.day_name:
    print(day)
