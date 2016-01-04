/**
 * Created by ApoZteriori on 17.12.2015.
 */
//JSON

(function($, undefined){
    $(function(){
        //our json
        var countries = '[{"title":"United Kingdom","text":"The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK) or Britain, is a sovereign state in Europe."}, {"title":"France","text":"France, officially the French Republic (French: R\u00e9publique fran\u00e7aise), is a unitary sovereign state comprising territory in western Europe and several overseas regions and territories."}, {"title":"Spain","text":"Spain (Spanish: Espa\u00f1a), officially the Kingdom of Spain (Spanish: Reino de Espa\u00f1a), is a sovereign state located on the Iberian Peninsula in southwestern Europe."}, {"title":"Germany","text":"Germany, officially the Federal Republic of Germany (German: Bundesrepublik Deutschland), is a federal parliamentary republic in western-central Europe."}]';
        countries = $.parseJSON(countries);
        //sort array by title and buttonToggle direct/reserve sort
        var sortDirection = [directSort, reverseSort],
            count = 0;
        $(".toggle-sort").click(function(){
            sortDirection[count++%2]();
            refillTabs();
        });
        //first call sort
        sortDirection[count++%2]();
        //push data in html tag h3, p
        refillTabs();
        //animate accordion
        $(".accordion h3:first").addClass("active");
        $(".accordion p:not(:first)").hide();
        $(".accordion h3").click(function(){
                $(this)
                    .next("p").slideToggle("slow")
                    .siblings("p:visible").slideUp("slow");
                $(this).toggleClass("active");
                $(this).siblings("h3").removeClass("active");
        });
        //slideUp and remove h3.active + p from DOM
        $(".remove-tab").click(function(){
            //delete obj by "title" from array
            var delIndex = 0;
            var active =  $(".active");
            $.grep(countries, function(elem, n){
                if (elem.title === active.html()) {
                    delIndex = n;
                }
            });
            countries.splice(delIndex, 1);


            active.next("p").slideUp('normal', function(){ active.next("p").remove(); });
            active.slideUp('normal', function(){ active.remove(); })

        });

        function directSort() {
            countries.sort(function(a, b) {
                return compareStrings(a.title, b.title);
            })
        }
        function reverseSort() {
            countries.sort(function(a, b) {
                return compareStrings(b.title, a.title);
            })
        }
        function compareStrings(a, b) {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }
        function refillTabs() {
            $(".accordion h3").each( function(i) {
                $(this)
                    .html(countries[i].title)
                    .css('opacity','0.5')
                    .animate({opacity: 1}, 300);
                $(this).next("p")
                    .html(countries[i].text)
                    .css('opacity','0.5')
                    .animate({opacity: 1}, 300);
            });
        }
    });
})(jQuery);


