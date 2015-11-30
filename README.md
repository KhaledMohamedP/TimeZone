# TimeZone
Tell the difference between two/more timezones. The clock is built with JS, CSS only (no images,svg...) 

# Demo 
[Demo](http://khaledm.com/projects/TimeZone/) 

# Sketching (plan)
Making the clock coordination was a bit tricky at first 
The plan: 
```            

            |4
            |3
            |2
            |1
- ----------0----------- +
            |-1
            |-2
            |-3
            |-4

ClockDiv
----------   
|        | 
|12345678| 
|   ^    |
----------

so in order to know our axis in the graph from our div property 
9/2 = 4

middle 
4-4 = 0 
ClockDiv
----------   
|        | 
|12345678| 
|   0    |
----------
thus, 
6-4 = 2 good 
----------   
|        | 
|12345678| 
|   ^^^  |
|   012  | 
----------
```

Used google autocomplete and timezone api (for accuracy)
Used MomentJS
