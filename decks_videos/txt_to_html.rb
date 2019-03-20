# assumes each deck is represented by
# two lines of text:
#   1. number name
#   2. youtube video link
begin
  # use 'w' to create a new file everytime:
  file = File.open('decks.html', 'w')
  File.open("decks_in_numerical_order.txt").each_slice(2) do |twolines|
    line1 = twolines[0].rstrip
    line2 = twolines[1].rstrip
    # puts "*** #{$.}. #{line1} #{line2}"
    # add surrounding HTML here:
    file.puts "#{line1} #{line2}"
  end
rescue IOError => e
  puts "IOError!!!"
ensure
  file.close unless file.nil?
end
