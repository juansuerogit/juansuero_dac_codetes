

you can run the application in 2 ways.

node app/dacccodetest.js

or 

npm start -s


below is a sample run.................

=========================================================================


node app/dacccodetest.js

DACC Code Challenge.........

        PORTFOLIO SHARE CLASS APPLICATION

        --Commands:
        COUNTS:           display the total number of portfolios and portfolio shares classes loaded from the CSVs
        LIST PORTFOLIOS:  display a list of all portfolios loaded showing the portfolio name and the number of share classes associated
        SHOW SHARE CLASS: displays a second prompt “Code?” asking for the portfolio code and then display all the share classes for that entered portfolio code
        q:                quit

COUNTS
10 Portfolios loaded.
35 Portfolio Share Classes loaded.

LIST PORTFOLIOS
Amber State Capital Appreciation Fund, 4
Blue River Qualified Purchaser Fund, 5
Alpha Omega Delta Fund, 5
Hudson River Fund, 3
Macaulay Opportunity Fund, 2
Voya Capital Delta Fund, 3
Wells Fargo Columbia Opportunity Fund, 2
PIMCO Nuveen Income Opportunity Fund, 2
Royce Opportunity Fund, 6
Wells Fargo Capital Cooperation Fund, 3

SHOW SHARE CLASS
Code?
OPFND
Macaulay Opportunity Fund  New Issue Eligible  eMa  14%
Macaulay Opportunity Fund  Restricted Class    sMa  16%

SHOW SHARE CLASS
Code?
AAAAA
AAAAA not found

q
end of program

=========================================================================

here is an example of file not found functionality
as you can see the relevent file is reported missing each time


node app/dacccodetest.js

DACC Code Challenge.........

        PORTFOLIO SHARE CLASS APPLICATION

        --Commands:
        COUNTS:           display the total number of portfolios and portfolio shares classes loaded from the CSVs
        LIST PORTFOLIOS:  display a list of all portfolios loaded showing the portfolio name and the number of share classes associated
        SHOW SHARE CLASS: displays a second prompt “Code?” asking for the portfolio code and then display all the share classes for that entered portfolio code
        q:                quit

Error Loading PortfolioShareClass.CSV, File not found!
end of program

-------------------------------

node app/dacccodetest.js

DACC Code Challenge.........

        PORTFOLIO SHARE CLASS APPLICATION

        --Commands:
        COUNTS:           display the total number of portfolios and portfolio shares classes loaded from the CSVs
        LIST PORTFOLIOS:  display a list of all portfolios loaded showing the portfolio name and the number of share classes associated
        SHOW SHARE CLASS: displays a second prompt “Code?” asking for the portfolio code and then display all the share classes for that entered portfolio code
        q:                quit

Error Loading Portfolio.CSV, File not found!
end of program




