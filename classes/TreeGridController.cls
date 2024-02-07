public class TreeGridController {

    @Auraenabled(cacheable=true)
    public static List<Account> getaccountList(){
        return [SELECT Id, Name, Phone, (SELECT Id, Name, Phone FROM Contacts) FROM Account];
    }
}