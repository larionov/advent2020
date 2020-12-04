(ns advent2020.day2.part1
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

(def data (->> (io/resource "day2/input.txt")
               slurp
               str/split-lines))

(defn parse-line [s]
  (let [[_ min max char pass] (re-find #"(\d+)-(\d+) (.): (.+)" s)]
    [(Long/parseLong min) (Long/parseLong max) (first char) pass]))
;; => "1-3 a: abcde"


(defn is-valid? [[min max char pass]] (<= min (get (frequencies pass) char 0) max))

(parse-line (first data))
(count (->>
        data
        (map #(parse-line %))
        (filter #(is-valid? %))))
;; => 990
