# assumes each deck is represented by
# two lines of text:
#   1. number name
#   2. youtube video link
begin
  # use 'w' to create a new file everytime:
  file = File.open('decks.html', 'w')
  File.open("decks_in_numerical_order.txt").each_slice(2) do |twolines|
    aline = twolines[0].rstrip
    num, name = aline.split(" ", 2)
    ytlink = twolines[1].rstrip
    # puts "*** #{$.}. #{line1} #{line2}"
    # add surrounding HTML here, for example:
    # <li deck-id="o001">
    #   <h2><a href="javascript:void(0);">some oracle deck</a></h2>
    #   <p>oracle o001, cards</p>
    # </li>
    file.puts "<li deck-id=\"#{num}\">"
    file.puts "\t<h2><a href=\"#{ytlink}\" target=\"_blank\" title=\"watch YouTube video\">#{name}</a></h2>"
    if num[0] == 'o' then
      file.puts "\t<p>odeck #{num}</p>"
    else
      file.puts "\t<p>tdeck #{num}</p>"
    end
    file.puts "</li>"
  end
rescue IOError => e
  puts "IOError!!!"
ensure
  file.close unless file.nil?
end
