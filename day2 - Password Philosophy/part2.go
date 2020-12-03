package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func isValidPassword(line string) bool {
	if len(line) <= 0 {
		return false
	}

	spl := strings.Split(line, " ")
	first, err := strconv.Atoi(spl[0])
	last, err := strconv.Atoi(spl[1])
	check(err)

	char := spl[2]
	pass := spl[3]

	hasFirst := string(pass[first-1]) == char
	hasLast := string(pass[last-1]) == char

	return (hasFirst && !hasLast) || (!hasFirst && hasLast)
}

func main() {
	data, err := ioutil.ReadFile("./input.txt")
	check(err)

	lines := strings.Split(strings.TrimSpace(string(data)), "\n")

	count := 0
	for i := 0; i < len(lines); i++ {
		line := strings.ReplaceAll(strings.ReplaceAll(lines[i], ": ", " "), "-", " ")

		if isValidPassword(line) {
			count++
		}
	}
	fmt.Printf("%v\n", count)
}
