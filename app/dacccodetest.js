
var csv = require('csv')
var chalk = require('chalk')
var util = require('util');
var table = require('easy-table')


var appdriver = new ApplicationDriver()

appdriver.printStartMsg()


appdriver.loadPortfolioData((err) => {
    if (err.code === 'ENOENT') {
        console.log('Error Loading ' + err.thefile + ', File not found!');
    } else {
        console.log('Error Loading PortfolioData!, files were found so its not that');
    }
    done();
})


var usagemsg = '\n'
usagemsg += "	--Commands: \n"
usagemsg += "	COUNTS:           display the total number of portfolios and portfolio shares classes loaded from the CSVs \n"
usagemsg += "	LIST PORTFOLIOS:  display a list of all portfolios loaded showing the portfolio name and the number of share classes associated \n"
usagemsg += "	SHOW SHARE CLASS: displays a second prompt “Code?” asking for the portfolio code and then display all the share classes for that entered portfolio code \n"
usagemsg += "	q:                quit \n"

console.log(usagemsg)



process.stdin.resume();
process.stdin.setEncoding('utf8');

var ssc = false;

process.stdin.on('data', function (text) {

    if (!ssc) {
        switch (text) {

            case 'COUNTS\n':
                appdriver.printCounts()

                break;
            case 'LIST PORTFOLIOS\n':
                appdriver.printListPortfolios()
                break;
            case 'SHOW SHARE CLASS\n':
                console.log("Code?")
                ssc = true;
                break;
            case 'q\n':
                done();
                break;
            default:
                console.log(usagemsg)
                break;
        }

    } else {
        try {
            appdriver.printShowShareClass(text.trim())
        } catch (e) {
            console.log(text.trim() + " not found\n")
        }

        ssc = false;
    }
});





function done() {
    console.log('end of program');
    process.exit();
}





function ApplicationDriver() {

    this.dictionaryOfPortfolios = []
    this.dictionaryOfPortfolioNameToCodeMapping = []
    this.counts = {
        portfolioCount: 0,
        portfolioClassCount: 0
    }


    this.printStartMsg = function () {
        var startmsg = '\n'
        startmsg += "DACC Code Challenge.........\n"
        startmsg += "\n"
        startmsg += "	PORTFOLIO SHARE CLASS APPLICATION"
        console.log(startmsg)

    }

    this.printCounts = function () {
        console.log(this.counts.portfolioCount + " Portfolios loaded.")
        console.log(this.counts.portfolioClassCount + " Portfolio Share Classes loaded.")
        console.log()
    }

    this.printListPortfolios = function () {

        for (var index in this.dictionaryOfPortfolios) {
            console.log(this.dictionaryOfPortfolios[index].PortfolioName + ", " + this.dictionaryOfPortfolios[index].getShareClassCount());
        }
        console.log()
    }
    this.printShowShareClass = function (code) {


        var portfolioName = this.dictionaryOfPortfolioNameToCodeMapping[code]

        var shareClasses = this.dictionaryOfPortfolios[portfolioName].getShareClasses()

        var t = new table()


        shareClasses.forEach(function (sc) {
            t.cell('PortfolioName', sc.PortfolioName)
            t.cell('ClassName', sc.ClassName)
            t.cell('ClassCode', sc.ClassCode)
            t.cell('BaseFee', sc.BaseFee)
            t.newRow()
        })

        console.log(t.print())

    }

    this.loadPortfolioData = function (errcallback) {

        var csvobjPortfolio = csv();

        var dp = this.dictionaryOfPortfolios
        var dpncmap = this.dictionaryOfPortfolioNameToCodeMapping
        var cnts = this.counts;

        csvobjPortfolio.from.path(__dirname + '/Portfolio.CSV').to.array(function (data) {
            for (var index = 1; index < data.length; index++) {
                dp[data[index][0]] = new Portfolio(data[index][0], data[index][1], data[index][2])
                dpncmap[data[index][1]] = data[index][0]
                cnts.portfolioCount++
            }
        }).on('error', function (e) {
            e.thefile = "Portfolio.CSV"
            errcallback(e)
        }).on('end', function (data) {
            loadPortfolioShareClassData(dp, cnts, errcallback)
        });



        function loadPortfolioShareClassData(dp, cnts, err) {

            var csvobjPortfolioShareClasses = csv();

            csvobjPortfolioShareClasses.from.path(__dirname + '/PortfolioShareClass.CSV').to.array(function (data) {
                for (var index = 1; index < data.length; index++) {

                    dp[data[index][0]].addShareClass(new PortfolioShareClass(data[index][0], data[index][1], data[index][2], data[index][3]))
                    cnts.portfolioClassCount++
                }
            }).on('error', function (e) {
                e.thefile = "PortfolioShareClass.CSV"
                err(e)
            }).on('end', function (data) {

            });

        }
    }

}

function Portfolio(portfolioName, code, marketValue) {

    this.PortfolioName = portfolioName
    this.Code = code
    this.MarketValue = marketValue

    this.ArrayOfShareClasses = [];


    this.addShareClass = function (shareClass) {
        this.ArrayOfShareClasses.push(shareClass)
    }


    this.getShareClasses = function () {
        return this.ArrayOfShareClasses
    }

    this.getShareClassCount = function () {
        return this.ArrayOfShareClasses.length
    }


}

function PortfolioShareClass(portfolioName, className, classCode, baseFee) {
    this.PortfolioName = portfolioName
    this.ClassName = className
    this.ClassCode = classCode
    this.BaseFee = baseFee

}

